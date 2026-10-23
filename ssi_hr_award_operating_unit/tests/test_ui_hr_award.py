# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrAward(HttpSavepointCase):
    """Tour tests for the ``hr.award`` operating unit delta."""

    @classmethod
    def setUpClass(cls):
        """Grant admin the groups needed to see the Operating Unit field.

        The multi operating unit group is required for the Operating Unit
        field itself to be rendered on the form. The award viewer group
        is granted explicitly so the tour does not depend on an implied
        group chain to reach the menu.
        """
        super().setUpClass()
        cls.user_admin = cls.env.ref("base.user_admin")
        cls.env.ref("ssi_hr_award.hr_award_viewer_group").sudo().write(
            {"users": [(4, cls.user_admin.id)]}
        )
        cls.env.ref("operating_unit.group_multi_operating_unit").sudo().write(
            {"users": [(4, cls.user_admin.id)]}
        )

    def test_field_ou(self):
        """Run the delta tour for the award create form.

        IK: docs/hr_award/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_operating_unit_hr_award_field_ou",
            login="admin",
        )
