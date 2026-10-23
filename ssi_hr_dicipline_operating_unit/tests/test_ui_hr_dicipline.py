# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrDicipline(HttpSavepointCase):
    """Tour tests for the ``hr.dicipline`` operating unit delta."""

    @classmethod
    def setUpClass(cls):
        """Grant admin the groups needed to see the Operating Unit field.

        The multi operating unit group is required for the Operating
        Unit field itself to be rendered on the form; the viewer group is
        repeated explicitly so the tour does not depend on the implication
        chain of the validator group.
        """
        super().setUpClass()
        cls.user_admin = cls.env.ref("base.user_admin")
        cls.env.ref("ssi_hr_dicipline.hr_dicipline_viewer_group").sudo().write(
            {"users": [(4, cls.user_admin.id)]}
        )
        cls.env.ref("operating_unit.group_multi_operating_unit").sudo().write(
            {"users": [(4, cls.user_admin.id)]}
        )

    def test_field_ou(self):
        """Run the delta tour for the dicipline create form.

        IK: docs/hr_dicipline/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_operating_unit_hr_dicipline_field_ou",
            login="admin",
        )
