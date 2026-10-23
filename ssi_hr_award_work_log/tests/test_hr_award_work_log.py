# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestHrAwardWorkLog(YamlTransactionCase):
    """Scenario tests for the work log delta of awards."""

    def test_work_realization(self):
        """Run the work estimation and realization scenario."""
        self.run_yaml_scenario("test_data_hr_award_work_log.yaml")
