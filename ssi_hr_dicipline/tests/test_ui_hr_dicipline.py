# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrDicipline(HttpSavepointCase):
    """UI tour test suite for ``hr.dicipline``."""

    @classmethod
    def setUpClass(cls):
        """Prepare the master data and one record per tour starting state."""
        super().setUpClass()
        # Pre-Condition: admin is already in the validator group (security data),
        # which implies the user and viewer groups.
        cls.dicipline_type = cls.env["hr.dicipline_type"].create(
            {"name": "TOUR DIC TYPE", "code": "/"}
        )
        cls.dicipline_reason = cls.env["hr.dicipline_reason"].create(
            {"name": "TOUR DIC REASON", "code": "/"}
        )
        cls.cancel_reason = cls.env["base.cancel_reason"].create(
            {"name": "TOUR DIC CANCEL REASON", "code": "TOURDICCXL", "global_use": True}
        )

        # Employee picked through the UI by the create tour.
        cls.env["hr.employee"].create({"name": "TOUR DIC CREATE"})

        # Records prepared in the starting state each tour begins from.
        cls._prepare_dicipline("TOUR DIC EDIT")
        cls._prepare_dicipline("TOUR DIC DELETE")
        cls._prepare_dicipline("TOUR DIC CONFIRM")
        cls._prepare_dicipline("TOUR DIC CANCEL")
        for name in ("TOUR DIC APPROVE", "TOUR DIC REJECT"):
            cls._prepare_dicipline(name).with_context(
                bypass_policy_check=True
            ).action_confirm()
        cls._prepare_dicipline("TOUR DIC RESTART").with_context(
            bypass_policy_check=True
        ).action_cancel()

        # Pre-Condition for the restart-approval tour: ``restart_approval_ok``
        # (see policy_template_data.xml) only grants the button when the
        # confirmed record has NO ``approval_template_id`` yet -- the stalled
        # scenario the button recovers from. The standard approval template
        # matches every record, so it is deactivated for this one
        # ``action_confirm`` call and reactivated right after.
        approval_template = cls.env.ref("ssi_hr_dicipline.approval_template").sudo()
        stalled = cls._prepare_dicipline("TOUR DIC RELOAD APPROVAL")
        approval_template.write({"active": False})
        stalled.with_context(bypass_policy_check=True).action_confirm()
        approval_template.write({"active": True})

    @classmethod
    def _prepare_dicipline(cls, name):
        """Create a draft dicipline for a uniquely named employee.

        The employee name is the stable marker the tour uses to find the
        record.
        """
        employee = cls.env["hr.employee"].create({"name": name})
        return cls.env["hr.dicipline"].create(
            {
                "employee_id": employee.id,
                "type_id": cls.dicipline_type.id,
                "reason_ids": [(6, 0, cls.dicipline_reason.ids)],
                "date": "2026-01-10",
                "date_start": "2026-01-10",
                "date_end": "2026-02-10",
            }
        )

    def test_create(self):
        """Run the create tour.

        IK: docs/hr_dicipline/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour.

        IK: docs/hr_dicipline/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour.

        IK: docs/hr_dicipline/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_delete",
            login="admin",
        )

    def test_confirm(self):
        """Run the confirm tour.

        IK: docs/hr_dicipline/04-confirm.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_confirm",
            login="admin",
        )

    def test_approve(self):
        """Run the approve tour.

        IK: docs/hr_dicipline/05-approve.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_approve",
            login="admin",
        )

    def test_reject(self):
        """Run the reject tour.

        IK: docs/hr_dicipline/06-reject.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_reject",
            login="admin",
        )

    def test_cancel(self):
        """Run the cancel tour.

        IK: docs/hr_dicipline/10-cancel.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_cancel",
            login="admin",
        )

    def test_restart(self):
        """Run the restart tour.

        IK: docs/hr_dicipline/12-restart.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_restart",
            login="admin",
        )

    def test_restart_approval(self):
        """Run the restart approval tour.

        IK: docs/hr_dicipline/14-restart-approval.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_restart_approval",
            login="admin",
        )
