# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrAward(HttpSavepointCase):
    """UI tour test suite for ``hr.award``."""

    @classmethod
    def setUpClass(cls):
        """Prepare the master data and one record per tour starting state.

        The validator group is granted to ``base.user_admin`` by the module
        data, so admin can open the menu, act as the approver, cancel and
        restart.
        """
        super().setUpClass()
        # Pre-Condition master data, not the focus of the tours.
        cls.award_type = cls.env["hr.award_type"].create(
            {"name": "TOUR AWD TYPE 1", "code": "/"}
        )
        # Second type, so the edit tour really changes the value.
        cls.env["hr.award_type"].create({"name": "TOUR AWD TYPE 2", "code": "/"})
        cls.award_reason = cls.env["hr.award_reason"].create(
            {"name": "TOUR AWD REASON", "code": "/"}
        )
        cls.cancel_reason = cls.env["base.cancel_reason"].create(
            {"name": "TOUR AWD CANCEL REASON", "code": "TOURAWDCXL", "global_use": True}
        )

        # Employee picked through the UI by the create tour.
        cls._prepare_employee("TOUR AWD CREATE")

        # Records prepared in the starting state each tour begins from.
        cls._prepare_award("TOUR AWD EDIT")
        cls._prepare_award("TOUR AWD DELETE")
        cls._prepare_award("TOUR AWD CONFIRM")
        cls._prepare_award("TOUR AWD CANCEL")
        for name in ("TOUR AWD APPROVE", "TOUR AWD REJECT"):
            cls._prepare_award(name).with_context(
                bypass_policy_check=True
            ).action_confirm()
        cls._prepare_award("TOUR AWD RESTART").with_context(
            bypass_policy_check=True
        ).action_cancel()

        # Pre-Condition for the restart-approval tour: ``restart_approval_ok``
        # only grants the button when the confirmed record has NO
        # ``approval_template_id`` yet -- the stalled scenario the button
        # recovers from. The standard approval template matches every record,
        # so it is deactivated for this one ``action_confirm`` call and
        # reactivated right after.
        approval_template = cls.env.ref("ssi_hr_award.approval_template").sudo()
        stalled = cls._prepare_award("TOUR AWD RELOAD APPROVAL")
        approval_template.write({"active": False})
        stalled.with_context(bypass_policy_check=True).action_confirm()
        approval_template.write({"active": True})

    @classmethod
    def _prepare_employee(cls, name):
        """Create an employee whose name is the stable marker for a tour.

        :param name: employee name used by the tour to find the record
        :return: the new ``hr.employee`` record
        """
        return cls.env["hr.employee"].create({"name": name})

    @classmethod
    def _prepare_award(cls, name):
        """Create a draft award for a uniquely named employee.

        :param name: employee name used by the tour to find the record
        :return: the new ``hr.award`` record
        """
        employee = cls._prepare_employee(name)
        return cls.env["hr.award"].create(
            {
                "user_id": cls.env.ref("base.user_admin").id,
                "employee_id": employee.id,
                "type_id": cls.award_type.id,
                "reason_ids": [(6, 0, [cls.award_reason.id])],
                "date": "2026-01-15",
                "date_start": "2026-01-01",
                "date_end": "2026-12-31",
            }
        )

    def test_create(self):
        """Run the create tour.

        IK: docs/hr_award/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour.

        IK: docs/hr_award/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour.

        IK: docs/hr_award/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_delete",
            login="admin",
        )

    def test_confirm(self):
        """Run the confirm tour.

        IK: docs/hr_award/04-confirm.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_confirm",
            login="admin",
        )

    def test_approve(self):
        """Run the approve tour.

        IK: docs/hr_award/05-approve.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_approve",
            login="admin",
        )

    def test_reject(self):
        """Run the reject tour.

        IK: docs/hr_award/06-reject.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_reject",
            login="admin",
        )

    def test_cancel(self):
        """Run the cancel tour.

        IK: docs/hr_award/10-cancel.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_cancel",
            login="admin",
        )

    def test_restart(self):
        """Run the restart tour.

        IK: docs/hr_award/12-restart.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_restart",
            login="admin",
        )

    def test_restart_approval(self):
        """Run the restart approval tour.

        IK: docs/hr_award/14-restart-approval.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_restart_approval",
            login="admin",
        )
