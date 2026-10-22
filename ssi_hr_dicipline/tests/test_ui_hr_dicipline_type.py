# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrDiciplineType(HttpSavepointCase):
    """UI tour test suite for ``hr.dicipline_type``."""

    @classmethod
    def setUpClass(cls):
        """Prepare the master data records the tours start from."""
        super().setUpClass()
        for name in ("TOUR DICT EDIT", "TOUR DICT DELETE"):
            cls.env["hr.dicipline_type"].create({"name": name, "code": "/"})

    def test_create(self):
        """Run the create tour.

        IK: docs/hr_dicipline_type/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_type_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour.

        IK: docs/hr_dicipline_type/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_type_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour.

        IK: docs/hr_dicipline_type/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_type_delete",
            login="admin",
        )
