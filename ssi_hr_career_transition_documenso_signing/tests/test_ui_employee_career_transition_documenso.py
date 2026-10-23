# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiEmployeeCareerTransitionDocumenso(HttpSavepointCase):
    """Tour test for the Documenso signing career transition delta."""

    @classmethod
    def setUpClass(cls):
        """Create one career transition already Waiting for Approval.

        The validator group implies the user and viewer groups, so admin
        can open the Career Transition menu. The record is moved to
        ``confirm`` in Python, not through UI clicks. The standard approval
        template has no Documenso Signing Template, so the Signature
        Requests tab is present and the base Approve flow is unaffected.
        """
        super().setUpClass()
        cls.env.ref(
            "ssi_hr_career_transition.employee_career_transition_validator_group"
        ).sudo().write({"users": [(4, cls.env.ref("base.user_admin").id)]})
        grade_g1 = cls.env["hr.job_grade"].create(
            {"name": "TOUR CTD GRADE G1", "code": "/"}
        )
        grade_g2 = cls.env["hr.job_grade"].create(
            {"name": "TOUR CTD GRADE G2", "code": "/"}
        )
        transition_type = cls.env["employee_career_transition_type"].create(
            {
                "name": "TOUR CTD TYPE",
                "code": "/",
                "change_job_grade": True,
                "require_job_grade": True,
            }
        )
        employee = cls.env["hr.employee"].create(
            {
                "name": "TOUR CTD APPROVE",
                "work_information_method": "career_transition",
                "manual_job_grade_id": grade_g1.id,
            }
        )
        transition = cls.env["employee_career_transition"].create(
            {
                "employee_id": employee.id,
                "type_id": transition_type.id,
                "effective_date": "2026-01-01",
                "new_job_grade_id": grade_g2.id,
            }
        )
        transition.with_context(bypass_policy_check=True).action_confirm()

    def test_approve(self):
        """Run the approve tour for the Documenso signing delta.

        IK: docs/employee_career_transition/05-approve.md (E2a delta --
        Modified Flow)
        """
        self.start_tour(
            "/web",
            "ssi_hr_career_transition_documenso_signing_approve",
            login="admin",
        )
