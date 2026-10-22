# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
#
# Migration: 14.0.2.4.1 -> 14.0.2.5.0
#
# Changes: ``hr.employee.job_grade_id`` changes from a plain field into a
#          stored compute field that falls back to the new
#          ``manual_job_grade_id``. The new manual column starts empty, so
#          the next recompute would blank every existing grade. Copy the
#          current grade into it first.

import logging

from openupgradelib import openupgrade

_logger = logging.getLogger(__name__)


@openupgrade.migrate()
def migrate(env, version):
    """Copy ``job_grade_id`` into ``manual_job_grade_id`` on employees.

    :param env: the migration environment
    :param version: the version being migrated to (unused)
    :return: nothing; updates ``hr_employee`` rows
    """
    rows = openupgrade.logged_query(
        env.cr,
        """
        UPDATE hr_employee
        SET manual_job_grade_id = job_grade_id
        WHERE job_grade_id IS NOT NULL
        AND manual_job_grade_id IS NULL
        """,
    )
    _logger.info("Copied job_grade_id into manual_job_grade_id on %s row(s).", rows)
