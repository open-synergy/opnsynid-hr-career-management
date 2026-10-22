odoo.define("ssi_hr_career_transition.employee_career_transition_edit_tour", function (
    require
) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/employee_career_transition/02-edit.md
    tour.register(
        "ssi_hr_career_transition_edit",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Flow 1 — Open the Human Resource > Career Management > Career
            // Transition menu.
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
                content: "Open the Career Transition menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr_career_transition.employee_career_transition_menu"]',
            },
            {
                // Gate on the TARGET action title: opening the app lands on its
                // first menu, so a generic ".o_list_view" would match the stale
                // landing view.
                content: "Career Transition list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Career Transition)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 2 — Open the record to edit. The Pre-Condition record is
            // prepared in setUpClass for employee "TOUR CT EDIT".
            {
                content: "Open the career transition",
                trigger: ".o_data_row:contains(TOUR CT EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Career transition form is displayed",
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

            // ── Flow 4 — Change the fields.
            {
                content: "Change the Effective Date",
                trigger: ".o_field_widget[name='effective_date'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text 02/01/2026",
            },
            {
                content: "Select the new Job Grade",
                trigger: ".o_field_many2one[name='new_job_grade_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR CT GRADE G2",
            },
            {
                content: "Pick the new Job Grade from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR CT GRADE G2)",
                in_modal: false,
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
