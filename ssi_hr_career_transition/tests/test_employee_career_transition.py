# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase
from psycopg2 import IntegrityError

from odoo.tests import tagged
from odoo.tools import mute_logger


@tagged("post_install", "-at_install")
class TestEmployeeCareerTransition(YamlTransactionCase):
    """Scenario tests for ``employee_career_transition``."""

    def test_compute_transition_flags(self):
        """Run the terminate and permanent flag compute scenarios."""
        self.run_yaml_scenario("test_data_employee_career_transition_compute.yaml")

    def test_type_inline_reason(self):
        """Run the transition type inline reason scenario."""
        self.run_yaml_scenario("test_data_employee_career_transition_type_reason.yaml")

    def test_job_grade(self):
        """Run the job grade onchange, compute and required scenarios."""
        self.run_yaml_scenario("test_data_employee_career_transition_job_grade.yaml")

    @mute_logger("odoo.sql_db")
    def test_job_grade_restrict_delete(self):
        """Reject deleting a job grade used as a new job grade.

        Pure Python -- trigger P5 (L-22: ``psycopg2.IntegrityError`` is
        outside the 12 error types ``expect_error`` understands).
        ``mute_logger("odoo.sql_db")`` silences the PostgreSQL ERROR line,
        otherwise ``oca_checklog_odoo`` fails the CI.
        """
        grade = self.env["hr.job_grade"].create(
            {"name": "Test Restrict Grade", "code": "/"}
        )
        transition_type = self.env["employee_career_transition_type"].create(
            {"name": "Test Restrict Type", "code": "/"}
        )
        employee = self.env["hr.employee"].create({"name": "Test Restrict Employee"})
        self.env["employee_career_transition"].create(
            {
                "employee_id": employee.id,
                "type_id": transition_type.id,
                "new_job_grade_id": grade.id,
            }
        )
        with self.assertRaises(IntegrityError), self.env.cr.savepoint():
            grade.unlink()
