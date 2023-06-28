# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).
{
    "name": "Human Resource Career Transition",
    "version": "14.0.1.0.0",
    "website": "https://simetri-sinergi.id",
    "author": "PT. Simetri Sinergi Indonesia, OpenSynergy Indonesia",
    "license": "LGPL-3",
    "installable": True,
    "depends": [
        "ssi_hr",
        "ssi_hr_employee",
        "ssi_employee_document_mixin",
        "ssi_master_data_mixin",
        "ssi_transaction_confirm_mixin",
        "ssi_transaction_ready_mixin",
        "ssi_transaction_done_mixin",
        "ssi_transaction_cancel_mixin",
        "ssi_company_currency_mixin",
        "ssi_duration_mixin",
    ],
    "data": [
        "security/ir_module_category_data.xml",
        "security/res_group_data.xml",
        "security/ir.model.access.csv",
        "security/ir_rule_data.xml",
        "data/ir_sequence_data.xml",
        "data/sequence_template_data.xml",
        "data/policy_template_data.xml",
        "data/approval_template_data.xml",
        "views/employee_career_transition_type_views.xml",
        "views/employee_career_transition_views.xml",
        "views/hr_employee_views.xml",
        "views/res_company_views.xml",
    ],
    "demo": [],
}
