odoo.define("ssi_hr_dicipline.hr_dicipline_create_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline/01-create.md
    tour.register(
        "ssi_hr_dicipline_create",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Flow 1 — Open the Human Resource > Career Management > Employee
            // Diciplines menu.
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Human Resource app",
                trigger: '.o_app[data-menu-xmlid="ssi_hr.menu_root_human_resource"]',
            },
            {
                content: "Open the Career Management menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr.hr_career_management_menu"]',
            },
            {
                content: "Open the Employee Diciplines menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr_dicipline.hr_dicipline_menu"]',
            },
            {
                // Gate on the TARGET action title: opening the app lands on its
                // first menu, so a generic ".o_list_view" would match the stale
                // landing view.
                content: "Employee Diciplines list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Diciplines)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 2 — Click the New button. (14.0: "Create")
            {
                content: "Click Create",
                trigger: ".o_list_button_add",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Form is open in edit mode",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 3 — Fill in the header fields.
            {
                content: "Select the Employee",
                trigger: ".o_field_many2one[name='employee_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR DIC CREATE",
            },
            {
                content: "Pick the Employee from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR DIC CREATE)",
                in_modal: false,
            },
            {
                content: "Select the Type",
                trigger: ".o_field_many2one[name='type_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR DIC TYPE",
            },
            {
                content: "Pick the Type from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR DIC TYPE)",
                in_modal: false,
            },
            {
                content: "Select the Reason",
                trigger: ".o_field_many2manytags[name='reason_ids'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR DIC REASON",
            },
            {
                content: "Pick the Reason from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR DIC REASON)",
                in_modal: false,
            },
            {
                content: "Fill in Date Start",
                trigger: ".o_field_widget[name='date_start'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text 01/15/2026",
            },
            {
                content: "Fill in Date End",
                trigger: ".o_field_widget[name='date_end'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text 02/15/2026",
            },
            {
                content: "Fill in Date Dicipline",
                trigger: ".o_field_widget[name='date'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text 01/15/2026",
            },

            // ── Flow 4 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
                extra_trigger: ".o_form_view.o_form_editable",
            },

            // ── Post-Condition — A new dicipline is created in Draft.
            {
                content: "Dicipline is saved and in Draft status",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='draft'].btn-primary",
                extra_trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
