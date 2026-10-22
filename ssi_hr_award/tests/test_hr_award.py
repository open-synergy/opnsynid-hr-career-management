# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestHrAward(YamlTransactionCase):
    """Scenario tests for ``hr.award`` and its master data."""

    def test_award_type(self):
        """Run the award type create, edit and unlink scenarios."""
        self.run_yaml_scenario("test_data_hr_award_type.yaml")

    def test_award_reason(self):
        """Run the award reason create, edit and unlink scenarios."""
        self.run_yaml_scenario("test_data_hr_award_reason.yaml")

    def test_award(self):
        """Run the award workflow and negative path scenarios."""
        self.run_yaml_scenario("test_data_hr_award.yaml")
