odoo.define(
    "ssi_hr_career_transition.employee_career_transition_create_tour",
    function (require) {
        "use strict";

        var tour = require("web_tour.tour");

        // IK: docs/employee_career_transition/01-create.md
        tour.register(
            "ssi_hr_career_transition_create",
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
                    trigger:
                        '.o_app[data-menu-xmlid="ssi_hr.menu_root_human_resource"]',
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

                // ── Flow 3 — Fill in the header fields. Employee auto-fills the
                // Department/Manager/Job Position; Type decides which New fields
                // can be changed.
                {
                    content: "Select the Employee",
                    trigger: ".o_field_many2one[name='employee_id'] input",
                    extra_trigger: ".o_form_view.o_form_editable",
                    run: "text TOUR CT CREATE",
                },
                {
                    content: "Pick the Employee from the dropdown",
                    trigger:
                        ".ui-autocomplete .ui-menu-item a:contains(TOUR CT CREATE)",
                    in_modal: false,
                },
                {
                    content: "Select the Career Transition Type",
                    trigger: ".o_field_many2one[name='type_id'] input",
                    extra_trigger: ".o_form_view.o_form_editable",
                    run: "text TOUR CT GRADE TYPE",
                },
                {
                    content: "Pick the Career Transition Type from the dropdown",
                    trigger:
                        ".ui-autocomplete .ui-menu-item a:contains(TOUR CT GRADE TYPE)",
                    in_modal: false,
                },
                {
                    content: "Fill in Effective Date",
                    trigger: ".o_field_widget[name='effective_date'] input",
                    extra_trigger: ".o_form_view.o_form_editable",
                    run: "text 01/15/2026",
                },

                // ── Flow 3 (cont.) — Fill in the New Job Grade in the header. The field
                // is editable only once the type allows changing the job grade.
                {
                    content: "Select the new Job Grade",
                    trigger: ".o_field_many2one[name='new_job_grade_id'] input",
                    extra_trigger: ".o_form_view.o_form_editable",
                    run: "text TOUR CT GRADE G2",
                },
                {
                    content: "Pick the new Job Grade from the dropdown",
                    trigger:
                        ".ui-autocomplete .ui-menu-item a:contains(TOUR CT GRADE G2)",
                    in_modal: false,
                },

                // ── Flow 5 — Click Save.
                {
                    content: "Save the record",
                    trigger: ".o_form_button_save",
                    extra_trigger: ".o_form_view.o_form_editable",
                },

                // ── Post-Condition — A new career transition is created in Draft.
                {
                    content: "Career transition is saved and in Draft status",
                    trigger:
                        ".o_statusbar_status .o_arrow_button[data-value='draft'].btn-primary",
                    extra_trigger: ".o_form_view.o_form_readonly",
                    run: function () {
                        // Assertion only; do not trigger the default click action.
                    },
                },
            ]
        );
    }
);
