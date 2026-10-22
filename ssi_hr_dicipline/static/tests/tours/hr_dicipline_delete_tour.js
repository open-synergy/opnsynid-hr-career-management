odoo.define("ssi_hr_dicipline.hr_dicipline_delete_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline/03-delete.md
    tour.register(
        "ssi_hr_dicipline_delete",
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

            // ── Flow 2 — Open the record to delete. The Pre-Condition record is
            // prepared in setUpClass for employee "TOUR DIC DELETE".
            {
                content: "Open the dicipline",
                trigger: ".o_data_row:contains(TOUR DIC DELETE) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Dicipline form is displayed",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Flow 3 — Click Action > Delete.
            {
                content: "Open the Action menu",
                trigger: ".o_cp_action_menus button:contains(Action)",
            },
            {
                content: "Click Delete",
                // Match the exact label so ":contains(Delete)" never picks
                // another menu item.
                trigger: ".o_cp_action_menus .o_menu_item a",
                run: function () {
                    var $delete = $(".o_cp_action_menus .o_menu_item a").filter(
                        function () {
                            return $(this).text().trim() === "Delete";
                        }
                    );
                    $delete[0].click();
                },
            },

            // ── Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // ── Post-Condition — The record is removed and no longer appears
            // in the list.
            {
                content: "Click the Employee Diciplines breadcrumb",
                trigger:
                    ".breadcrumb-item.o_back_button a:contains(Employee Diciplines)",
                extra_trigger: "body:not(:has(.modal))",
            },
            {
                content: "Deleted dicipline no longer appears in the list",
                trigger:
                    ".o_list_view:not(:has(.o_data_row:contains(TOUR DIC DELETE)))",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
