# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestEmployeeCareerTransitionDocumenso(YamlTransactionCase):
    """Scenario tests for the Documenso signing career transition."""

    def test_confirm(self):
        """Run the confirm scenario with the Documenso mixin fields."""
        self.run_yaml_scenario("test_data_employee_career_transition_documenso.yaml")
