odoo.define("ssi_hr_award.hr_award_type_create_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_award_type/01-create.md
    tour.register(
        "ssi_hr_award_type_create",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Flow 1 — Open the Human Resource > Configuration > Career > Employee Award Types menu. "Career" (level 3) has
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
                content: "Open the Employee Award Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_hr_award.hr_award_type_menu"]',
            },
            {
                // Gate on the TARGET action title (the landing action is also a
                // .o_list_view).
                content: "Employee Award Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Award Types)",
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

            // ── Flow 3 — Fill in the name and the code.
            {
                content: "Fill in the name",
                trigger: ".o_field_widget[name='name']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR AWD TYPE CREATE",
            },
            {
                content: "Fill in Code",
                trigger: ".o_field_widget[name='code']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text /",
            },

            // ── Flow 4 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
                extra_trigger: ".o_form_view.o_form_editable",
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
