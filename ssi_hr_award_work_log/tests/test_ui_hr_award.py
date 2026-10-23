# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase, not HttpCase, on 14.0.
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrAwardWorkLog(HttpSavepointCase):
    """Tour tests for the work log delta of employee awards."""

    def test_create(self):
        """Run the create tour for ``hr.award``.

        IK: docs/hr_award/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_work_log_hr_award_create",
            login="admin",
        )
