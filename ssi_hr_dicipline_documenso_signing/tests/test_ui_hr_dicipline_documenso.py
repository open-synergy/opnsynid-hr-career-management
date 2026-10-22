# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrDiciplineDocumenso(HttpSavepointCase):
    """Tour test for the ``hr.dicipline`` Documenso signing delta."""

    @classmethod
    def setUpClass(cls):
        """Create one dicipline already Waiting for Approval.

        The record is moved to ``confirm`` in Python, not through UI
        clicks. The standard approval template has no Documenso Signing
        Template configured, so the Signature Requests tab is present
        but no signature request exists.
        """
        super().setUpClass()
        dicipline_type = cls.env["hr.dicipline_type"].create(
            {"name": "TOUR DIC DOC TYPE", "code": "/"}
        )
        dicipline_reason = cls.env["hr.dicipline_reason"].create(
            {"name": "TOUR DIC DOC REASON", "code": "/"}
        )
        employee = cls.env["hr.employee"].create({"name": "TOUR DIC DOC APPROVE"})
        dicipline = cls.env["hr.dicipline"].create(
            {
                "employee_id": employee.id,
                "type_id": dicipline_type.id,
                "reason_ids": [(6, 0, dicipline_reason.ids)],
                "date": "2026-01-10",
                "date_start": "2026-01-10",
                "date_end": "2026-02-10",
            }
        )
        dicipline.with_context(bypass_policy_check=True).action_confirm()

    def test_approve(self):
        """Run the approve tour for the Documenso signing delta.

        IK: docs/hr_dicipline/05-approve.md (E2a delta -- Modified Flow)
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_documenso_signing_hr_dicipline_approve",
            login="admin",
        )
