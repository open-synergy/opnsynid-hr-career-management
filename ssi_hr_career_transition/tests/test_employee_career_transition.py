# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestEmployeeCareerTransition(YamlTransactionCase):
    """Scenario tests for ``employee_career_transition``."""

    def test_compute_transition_flags(self):
        """Run the terminate and permanent flag compute scenarios."""
        self.run_yaml_scenario("test_data_employee_career_transition_compute.yaml")
