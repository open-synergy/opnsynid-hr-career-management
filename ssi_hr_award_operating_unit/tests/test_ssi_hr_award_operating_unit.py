# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestSSIHrAwardOperatingUnit(YamlTransactionCase):
    """Scenario tests for the award operating unit onchange and rule."""

    def test_ssi_hr_award_operating_unit(self):
        """Run the operating unit onchange and record rule scenarios."""
        self.run_yaml_scenario("test_data_ssi_hr_award_operating_unit.yaml")
