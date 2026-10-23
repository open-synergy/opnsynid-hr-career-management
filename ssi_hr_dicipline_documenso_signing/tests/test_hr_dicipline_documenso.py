# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestHrDiciplineDocumenso(YamlTransactionCase):
    """Scenario tests for the Documenso signing delta of ``hr.dicipline``."""

    def test_workflow(self):
        """Run the confirm and Documenso mixin field scenarios."""
        self.run_yaml_scenario("test_data_hr_dicipline_documenso.yaml")
