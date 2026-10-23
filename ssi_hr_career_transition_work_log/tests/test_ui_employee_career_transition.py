# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase, not HttpCase, on 14.0.
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiEmployeeCareerTransitionWorkLog(HttpSavepointCase):
    """Tour tests for the work log delta of career transitions."""

    @classmethod
    def setUpClass(cls):
        """Grant the group the Career Transition menu is gated by."""
        super().setUpClass()
        cls.env.ref(
            "ssi_hr_career_transition.employee_career_transition_validator_group"
        ).sudo().write({"users": [(4, cls.env.ref("base.user_admin").id)]})

    def test_create(self):
        """Run the create tour for ``employee_career_transition``.

        IK: docs/employee_career_transition/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_work_log_employee_career_transition_create",
            login="admin",
        )
