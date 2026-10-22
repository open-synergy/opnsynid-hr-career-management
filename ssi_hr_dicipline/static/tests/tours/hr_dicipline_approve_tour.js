odoo.define("ssi_hr_dicipline.hr_dicipline_approve_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline/05-approve.md
    tour.register(
        "ssi_hr_dicipline_approve",
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

            // ── Flow 2 — Open the record to approve. The Pre-Condition record is
            // prepared in setUpClass for employee "TOUR DIC APPROVE".
            {
                content: "Open the dicipline",
                trigger: ".o_data_row:contains(TOUR DIC APPROVE) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Dicipline form is displayed",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 3 — Click the Approve button.
            {
                content: "Click the Approve button",
                trigger: ".o_statusbar_buttons button[name='action_approve_approval']",
                extra_trigger: ".o_form_view",
            },

            // ── Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // ── Post-Condition — All approval levels are fulfilled, so the status changes to Done.
            {
                content: "Status is Done",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='done'].btn-primary",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
