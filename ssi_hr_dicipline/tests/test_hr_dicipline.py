# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase
from psycopg2 import IntegrityError

from odoo.tests import tagged
from odoo.tools import mute_logger


@tagged("post_install", "-at_install")
class TestHrDicipline(YamlTransactionCase):
    """Scenario tests for ``hr.dicipline`` and its master data."""

    def test_master_data(self):
        """Run the type and reason create, edit and unlink scenarios."""
        self.run_yaml_scenario("test_data_hr_dicipline_master.yaml")

    def test_workflow(self):
        """Run the dicipline workflow and negative path scenarios."""
        self.run_yaml_scenario("test_data_hr_dicipline_workflow.yaml")

    @mute_logger("odoo.sql_db")
    def test_type_required(self):
        """Reject creating a dicipline without a type.

        Pure Python -- trigger P5 (L-22: ``psycopg2.IntegrityError`` is
        outside the 12 error types ``expect_error`` understands).
        ``mute_logger("odoo.sql_db")`` silences the PostgreSQL ERROR line,
        otherwise ``oca_checklog_odoo`` fails the CI.
        """
        reason = self.env["hr.dicipline_reason"].create(
            {"name": "Test Required Reason", "code": "/"}
        )
        employee = self.env["hr.employee"].create({"name": "Test Required Employee"})
        with self.assertRaises(IntegrityError), self.env.cr.savepoint():
            self.env["hr.dicipline"].create(
                {
                    "employee_id": employee.id,
                    "reason_ids": [(6, 0, reason.ids)],
                    "date": "2026-02-01",
                    "date_start": "2026-02-01",
                    "date_end": "2026-03-01",
                }
            )
