odoo.define("ssi_hr_award.hr_award_reason_edit_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_award_reason/02-edit.md
    tour.register(
        "ssi_hr_award_reason_edit",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Flow 1 — Open the Human Resource > Configuration > Career > Employee Award Reasons menu. "Career" (level 3) has
            // more than one child, so it renders as a non-clickable dropdown header
            // and is skipped; only the leaf menu item gets a step.
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
                content: "Open the Employee Award Reasons menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr_award.hr_award_reason_menu"]',
            },
            {
                // Gate on the TARGET action title (the landing action is also a
                // .o_list_view).
                content: "Employee Award Reasons list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Award Reasons)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 2 — Find and open the record to edit. The Pre-Condition
            // record is prepared in setUpClass ("TOUR AWD REASON EDIT").
            {
                content: "Open the record",
                trigger:
                    ".o_data_row:contains(TOUR AWD REASON EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Form is displayed",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
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

            // ── Flow 4 — Change the name.
            {
                content: "Change the name",
                trigger: ".o_field_widget[name='name']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR AWD REASON EDITED",
            },

            // ── Flow 5 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
                extra_trigger: ".o_form_view.o_form_editable",
            },

            // ── Post-Condition — The record is updated with the new value.
            {
                content: "The name shows the new value",
                trigger:
                    ".o_form_view.o_form_readonly .o_field_widget[name='name']:contains(TOUR AWD REASON EDITED)",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
