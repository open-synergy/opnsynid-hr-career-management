odoo.define("ssi_hr_dicipline.hr_dicipline_type_edit_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline_type/02-edit.md
    tour.register(
        "ssi_hr_dicipline_type_edit",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Flow 1 — Open the Human Resource > Configuration > Career > Employee Dicipline Types menu.
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
                content: "Open the Employee Dicipline Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr_dicipline.hr_dicipline_type_menu"]',
            },
            {
                // Gate on the TARGET action title (stale landing view guard).
                content: "Employee Dicipline Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Dicipline Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 2 — Open the record to edit ("TOUR DICT EDIT").
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR DICT EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Form is open",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 3 — Click the Edit button.
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

            // ── Flow 4 — Change the Name.
            {
                content: "Change the Name",
                trigger: ".o_field_widget[name='name']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR DICT EDIT CHANGED",
            },

            // ── Flow 5 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
                extra_trigger: ".o_form_view.o_form_editable",
            },

            // ── Post-Condition — The record is updated.
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
