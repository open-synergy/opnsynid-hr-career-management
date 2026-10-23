# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrAwardDocumenso(HttpSavepointCase):
    """Tour test for the Documenso signing employee award delta."""

    @classmethod
    def setUpClass(cls):
        """Create one employee award already Waiting for Approval.

        The validator group is granted to ``base.user_admin`` by the base
        module data, so admin can open the Employee Awards menu. The
        record is moved to ``confirm`` in Python, not through UI clicks.
        The standard approval template has no Documenso Signing Template,
        so the Signature Requests tab is present and the base Approve flow
        is unaffected.
        """
        super().setUpClass()
        award_type = cls.env["hr.award_type"].create(
            {"name": "TOUR AWDD TYPE", "code": "/"}
        )
        award_reason = cls.env["hr.award_reason"].create(
            {"name": "TOUR AWDD REASON", "code": "/"}
        )
        employee = cls.env["hr.employee"].create({"name": "TOUR AWDD APPROVE"})
        award = cls.env["hr.award"].create(
            {
                "user_id": cls.env.ref("base.user_admin").id,
                "employee_id": employee.id,
                "type_id": award_type.id,
                "reason_ids": [(6, 0, [award_reason.id])],
                "date": "2026-01-15",
                "date_start": "2026-01-01",
                "date_end": "2026-12-31",
            }
        )
        award.with_context(bypass_policy_check=True).action_confirm()

    def test_approve(self):
        """Run the approve tour for the Documenso signing delta.

        IK: docs/hr_award/05-approve.md (E2a delta -- Modified Flow)
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_documenso_signing_approve",
            login="admin",
        )
