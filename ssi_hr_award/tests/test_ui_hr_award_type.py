# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrAwardType(HttpSavepointCase):
    """UI tour test suite for ``hr.award_type``."""

    @classmethod
    def setUpClass(cls):
        """Prepare one record per tour starting state.

        The configurator group is granted to ``base.user_admin`` by the
        module data, so the Configuration menu is visible to the tours.
        """
        super().setUpClass()
        master_model = cls.env["hr.award_type"]
        master_model.create({"name": "TOUR AWD TYPE EDIT", "code": "/"})
        master_model.create({"name": "TOUR AWD TYPE DELETE", "code": "/"})

    def test_create(self):
        """Run the create tour.

        IK: docs/hr_award_type/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_type_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour.

        IK: docs/hr_award_type/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_type_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour.

        IK: docs/hr_award_type/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_type_delete",
            login="admin",
        )
