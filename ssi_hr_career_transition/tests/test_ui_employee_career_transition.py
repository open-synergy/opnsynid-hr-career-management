# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiEmployeeCareerTransition(HttpSavepointCase):
    """UI tour test suite for ``employee_career_transition``."""

    @classmethod
    def setUpClass(cls):
        """Prepare the master data and one record per tour starting state."""
        super().setUpClass()
        # Pre-Condition: the Career Transition menu and the state buttons are
        # gated by the workflow groups. The validator group implies the user and
        # viewer groups, so admin can open the menu, act as the approver, cancel
        # and restart.
        cls.env.ref(
            "ssi_hr_career_transition.employee_career_transition_validator_group"
        ).sudo().write({"users": [(4, cls.env.ref("base.user_admin").id)]})

        # Pre-Condition master data, not the focus of the tours (built in Python).
        cls.grade_g1 = cls.env["hr.job_grade"].create(
            {"name": "TOUR CT GRADE G1", "code": "/"}
        )
        cls.grade_g2 = cls.env["hr.job_grade"].create(
            {"name": "TOUR CT GRADE G2", "code": "/"}
        )
        cls.transition_type = cls.env["employee_career_transition_type"].create(
            {
                "name": "TOUR CT GRADE TYPE",
                "code": "/",
                "change_job_grade": True,
                "require_job_grade": True,
            }
        )
        cls.cancel_reason = cls.env["base.cancel_reason"].create(
            {"name": "TOUR CT CANCEL REASON", "code": "TOURCTCXL", "global_use": True}
        )

        # Employee picked through the UI by the create tour.
        cls._prepare_employee("TOUR CT CREATE")

        # Records prepared in the starting state each tour begins from.
        cls._prepare_transition("TOUR CT EDIT")
        cls._prepare_transition("TOUR CT DELETE")
        cls._prepare_transition("TOUR CT CONFIRM")
        cls._prepare_transition("TOUR CT CANCEL")
        for name in ("TOUR CT APPROVE", "TOUR CT REJECT", "TOUR CT FINISH"):
            cls._prepare_transition(name).with_context(
                bypass_policy_check=True
            ).action_confirm()
        cls._prepare_transition("TOUR CT RESTART").with_context(
            bypass_policy_check=True
        ).action_cancel()

        # Pre-Condition for the restart-approval tour: ``restart_approval_ok``
        # (see policy_template_data.xml) only grants the button when the
        # confirmed record has NO ``approval_template_id`` yet -- the stalled
        # scenario the button recovers from. The standard approval template
        # matches every record, so it is deactivated for this one
        # ``action_confirm`` call and reactivated right after.
        approval_template = cls.env.ref(
            "ssi_hr_career_transition.employee_career_transition_approval_template"
        ).sudo()
        stalled = cls._prepare_transition("TOUR CT RELOAD APPROVAL")
        approval_template.write({"active": False})
        stalled.with_context(bypass_policy_check=True).action_confirm()
        approval_template.write({"active": True})

    @classmethod
    def _prepare_employee(cls, name):
        """Create an employee holding job grade G1.

        The name is the stable marker the tour uses to find the record.
        """
        return cls.env["hr.employee"].create(
            {
                "name": name,
                "work_information_method": "career_transition",
                "manual_job_grade_id": cls.grade_g1.id,
            }
        )

    @classmethod
    def _prepare_transition(cls, name):
        """Create a draft career transition for a uniquely named employee."""
        employee = cls._prepare_employee(name)
        return cls.env["employee_career_transition"].create(
            {
                "employee_id": employee.id,
                "type_id": cls.transition_type.id,
                "effective_date": "2026-01-01",
                "new_job_grade_id": cls.grade_g2.id,
            }
        )

    def test_create(self):
        """Run the create tour.

        IK: docs/employee_career_transition/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour.

        IK: docs/employee_career_transition/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour.

        IK: docs/employee_career_transition/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_delete",
            login="admin",
        )

    def test_confirm(self):
        """Run the confirm tour.

        IK: docs/employee_career_transition/04-confirm.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_confirm",
            login="admin",
        )

    def test_approve(self):
        """Run the approve tour.

        IK: docs/employee_career_transition/05-approve.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_approve",
            login="admin",
        )

    def test_reject(self):
        """Run the reject tour.

        IK: docs/employee_career_transition/06-reject.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_reject",
            login="admin",
        )

    def test_finish(self):
        """Run the finish tour.

        IK: docs/employee_career_transition/09-finish.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_finish",
            login="admin",
        )

    def test_cancel(self):
        """Run the cancel tour.

        IK: docs/employee_career_transition/10-cancel.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_cancel",
            login="admin",
        )

    def test_restart(self):
        """Run the restart tour.

        IK: docs/employee_career_transition/12-restart.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_restart",
            login="admin",
        )

    def test_restart_approval(self):
        """Run the restart approval tour.

        IK: docs/employee_career_transition/14-restart-approval.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_restart_approval",
            login="admin",
        )
