odoo.define("ssi_hr_dicipline.hr_dicipline_reason_create_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline_reason/01-create.md
    tour.register(
        "ssi_hr_dicipline_reason_create",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Flow 1 — Open the Human Resource > Configuration > Career > Employee Dicipline Reasons menu.
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Human Resource app",
                trigger: '.o_app[data-menu-xmlid="ssi_hr.menu_root_human_resource"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr.menu_human_resource_configuration"]',
            },
            {
                // "Career" is a grouping menu without an action, rendered as a
                // plain dropdown header; the leaf is a direct entry of the same
                // Configuration dropdown.
                content: "Open the Employee Dicipline Reasons menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr_dicipline.hr_dicipline_reason_menu"]',
            },
            {
                // Gate on the TARGET action title (stale landing view guard).
                content: "Employee Dicipline Reasons list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Dicipline Reasons)",
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

            // ── Flow 3 — Fill in the required fields.
            {
                content: "Fill in the Name",
                trigger: ".o_field_widget[name='name']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR DICR CREATE",
            },
            {
                content: "Fill in the Code",
                trigger: ".o_field_widget[name='code']",
                run: "text /",
            },

            // ── Flow 4 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // ── Post-Condition — A new record is created.
            {
                content: "Record is saved",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
