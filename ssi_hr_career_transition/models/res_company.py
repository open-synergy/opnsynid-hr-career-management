# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import fields, models


class Company(models.Model):
    _name = "res.company"
    _inherit = ["res.company"]

    join_transition_type_id = fields.Many2one(
        string="Join Transition Type",
        comodel_name="employee_career_transition_type",
    )
    join_employment_status_id = fields.Many2one(
        string="Join Employee Status",
        comodel_name="hr.employment_status",
    )
    terminate_transition_type_id = fields.Many2one(
        comodel_name="employee_career_transition_type",
        string="Terminate Transition Type",
    )
    terminate_employment_status_id = fields.Many2one(
        string="Terminate Employee Status",
        comodel_name="hr.employment_status",
    )
    permanent_transition_type_id = fields.Many2one(
        comodel_name="employee_career_transition_type",
        string="Permanent Transition Type",
    )
    permanent_employment_status_id = fields.Many2one(
        string="Permanent Employee Status",
        comodel_name="hr.employment_status",
    )
    contract_transition_type_id = fields.Many2one(
        comodel_name="employee_career_transition_type",
        string="Contract Transition Type",
    )
    contract_employment_status_id = fields.Many2one(
        string="Contract Employee Status",
        comodel_name="hr.employment_status",
    )
