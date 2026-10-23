odoo.define("ssi_hr_award.hr_award_restart_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_award/12-restart.md
    tour.register(
        "ssi_hr_award_restart",
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

            // ── Flow 2 — Open the record to restart. The Pre-Condition record is
            // prepared in setUpClass for employee "TOUR AWD RESTART".
            {
                content: "Open the employee award",
                trigger: ".o_data_row:contains(TOUR AWD RESTART) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Employee award form is displayed",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 3 — Click the Restart button.
            {
                content: "Click the Restart button",
                trigger: ".o_statusbar_buttons button[name='action_restart']",
                extra_trigger: ".o_form_view",
            },

            // ── Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // ── Post-Condition — Status returns to Draft.
            {
                content: "Status is Draft",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='draft'].btn-primary",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
