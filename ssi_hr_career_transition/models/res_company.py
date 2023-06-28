# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

from odoo import fields, models


class Company(models.Model):
    _name = "res.company"
    _inherit = ["res.company"]

    join_transition_type_id = fields.Many2one(
        comodel_name="employee_career_transition_type",
        string="Join Transition Type"
    )
    terminate_transition_type_id = fields.Many2one(
        comodel_name="employee_career_transition_type",
        string="Terminate Transition Type"
    )
    permanent_transition_type_id = fields.Many2one(
        comodel_name="employee_career_transition_type",
        string="Permanent Transition Type"
    )
