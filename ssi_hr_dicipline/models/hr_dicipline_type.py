# Copyright 2022 OpenSynergy Indonesia
# Copyright 2022 PT. Simetri Sinergi Indonesia
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

from odoo import fields, models


class HrDiciplineType(models.Model):
    _name = "hr.dicipline_type"
    _inherit = ["mixin.master_data"]
    _description = "Employee Dicipline Reason"

    name = fields.Char(
        string="Employee Dicipline Reason",
    )
