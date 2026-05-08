# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class HrCareerTransition(models.Model):
    _name = "employee_career_transition"
    _inherit = [
        "employee_career_transition",
        "mixin.single_operating_unit",
    ]
