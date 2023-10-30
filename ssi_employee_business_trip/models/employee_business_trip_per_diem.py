# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import fields, models


class EmployeeBusinessTripPerDiem(models.Model):
    _name = "employee_business_trip.per_diem"
    _description = "Employee Business Trip - Per Diem"
    _inherit = ["mixin.product_line_account", "mixin.account_move_single_line"]

    # account.move.line
    _partner_id_field_name = "employee_partner_id"
    _analytic_account_id_field_name = "analytic_account_id"
    _label_field_name = "name"
    _amount_currency_field_name = "price_subtotal"

    employee_business_trip_id = fields.Many2one(
        comodel_name="employee_business_trip",
        string="Employee Business Trip",
        required=True,
        ondelete="cascade",
    )
    # Additional
    sequence = fields.Integer(string="Sequence")
    move_id = fields.Many2one(
        related="employee_business_trip_id.move_id",
    )
    currency_id = fields.Many2one(
        related="employee_business_trip_id.currency_id",
    )
    company_currency_id = fields.Many2one(
        related="employee_business_trip_id.company_currency_id"
    )
    employee_partner_id = fields.Many2one(
        related="employee_business_trip_id.employee_partner_id"
    )
    date = fields.Date(related="employee_business_trip_id.date_start")
    pricelist_id = fields.Many2one(related="employee_business_trip_id.pricelist_id")
