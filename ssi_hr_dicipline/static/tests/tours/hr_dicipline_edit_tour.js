odoo.define("ssi_hr_dicipline.hr_dicipline_edit_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline/02-edit.md
    tour.register(
        "ssi_hr_dicipline_edit",
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

            // ── Flow 2 — Open the record to edit. The Pre-Condition record is
            // prepared in setUpClass for employee "TOUR DIC EDIT".
            {
                content: "Open the dicipline",
                trigger: ".o_data_row:contains(TOUR DIC EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Dicipline form is displayed",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 3 — Click the Edit button (14.0: an existing record opens
            // readonly).
            {
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

            // ── Flow 4 — Change the fields.
            {
                content: "Change the Date Dicipline",
                trigger: ".o_field_widget[name='date'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text 02/20/2026",
            },

            // ── Flow 5 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
                extra_trigger: ".o_form_view.o_form_editable",
            },

            // ── Post-Condition — The record is updated; the form returns to
            // readonly mode.
            {
                content: "Record is saved and back to readonly mode",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
