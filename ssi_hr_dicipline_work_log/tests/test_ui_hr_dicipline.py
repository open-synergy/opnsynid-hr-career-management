# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrDicipline(HttpSavepointCase):
    """Tour tests for the ``hr.dicipline`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Grant the group the Employee Diciplines menu is gated by.

        The menu is already covered by the default membership of
        ``hr_dicipline_validator_group`` (which implies the viewer
        group), but the grant is repeated explicitly here so the tour
        does not depend on that implication chain.
        """
        super().setUpClass()
        cls.env.ref("ssi_hr_dicipline.hr_dicipline_viewer_group").sudo().write(
            {"users": [(4, cls.env.ref("base.user_admin").id)]}
        )

    def test_create(self):
        """Run the create tour for ``hr.dicipline``.

        IK: docs/hr_dicipline/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_work_log_hr_dicipline_create",
            login="admin",
        )
