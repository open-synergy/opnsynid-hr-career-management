# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiHrAwardReason(HttpSavepointCase):
    """UI tour test suite for ``hr.award_reason``."""

    @classmethod
    def setUpClass(cls):
        """Prepare one record per tour starting state.

        The configurator group is granted to ``base.user_admin`` by the
        module data, so the Configuration menu is visible to the tours.
        """
        super().setUpClass()
        master_model = cls.env["hr.award_reason"]
        master_model.create({"name": "TOUR AWD REASON EDIT", "code": "/"})
        master_model.create({"name": "TOUR AWD REASON DELETE", "code": "/"})

    def test_create(self):
        """Run the create tour.

        IK: docs/hr_award_reason/01-create.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_reason_create",
            login="admin",
        )

    def test_edit(self):
        """Run the edit tour.

        IK: docs/hr_award_reason/02-edit.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_reason_edit",
            login="admin",
        )

    def test_delete(self):
        """Run the delete tour.

        IK: docs/hr_award_reason/03-delete.md
        """
        self.start_tour(
            "/web",
            "ssi_hr_award_reason_delete",
            login="admin",
        )
