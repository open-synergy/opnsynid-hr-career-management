odoo.define("ssi_hr_award.hr_award_edit_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_award/02-edit.md
    tour.register(
        "ssi_hr_award_edit",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Flow 1 — Open the Human Resource > Career Management > Employee
            // Awards menu.
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
                content: "Open the Employee Awards menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr_award.hr_award_menu"]',
            },
            {
                // Gate on the TARGET action title: opening the app lands on its
                // first menu, so a generic ".o_list_view" would match the stale
                // landing view.
                content: "Employee Awards list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Awards)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 2 — Find and open the record to edit. The Pre-Condition
            // record is prepared in setUpClass for employee "TOUR AWD EDIT".
            {
                content: "Open the employee award",
                trigger: ".o_data_row:contains(TOUR AWD EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Employee award form is displayed",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
            {
                // 14.0: an already-existing record opens readonly; Edit is
                // required before any field can be changed.
                content: "Click the Edit button",
                trigger: ".o_form_button_edit",
            },
            {
                content: "Form is now editable",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 4 — Change the fields. The new Type differs from the one
            // prepared in setUpClass.
            {
                content: "Fill in Date Award",
                trigger: ".o_field_widget[name='date'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text 02/01/2026",
            },
            {
                content: "Select the Type",
                trigger: ".o_field_many2one[name='type_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR AWD TYPE 2",
            },
            {
                content: "Pick the Type from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR AWD TYPE 2)",
                in_modal: false,
            },

            // ── Flow 5 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
                extra_trigger: ".o_form_view.o_form_editable",
            },

            // ── Post-Condition — The record is updated with the new values.
            {
                content: "Type shows the new value",
                trigger:
                    ".o_form_view.o_form_readonly .o_field_widget[name='type_id']:contains(TOUR AWD TYPE 2)",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
