# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrDiciplineReason(HttpSavepointCase):
    """UI tour test suite for ``hr.dicipline_reason``."""

    @classmethod
    def setUpClass(cls):
        """Prepare the master data records the tours start from."""
        super().setUpClass()
        for name in ("TOUR DICR EDIT", "TOUR DICR DELETE"):
            cls.env["hr.dicipline_reason"].create({"name": name, "code": "/"})

    def test_create(self):
        """Run the create tour.

        IK: docs/hr_dicipline_reason/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_reason_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour.

        IK: docs/hr_dicipline_reason/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_reason_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour.

        IK: docs/hr_dicipline_reason/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_dicipline_reason_delete",
            login="admin",
        )
