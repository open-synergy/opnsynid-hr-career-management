odoo.define("ssi_hr_dicipline.hr_dicipline_type_delete_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline_type/03-delete.md
    tour.register(
        "ssi_hr_dicipline_type_delete",
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

            // ── Flow 2 — Open the record to delete ("TOUR DICT DELETE").
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR DICT DELETE) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Form is open",
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

            // ── Flow 5 — Click the list breadcrumb.
            {
                content: "Click the Employee Dicipline Types breadcrumb",
                trigger:
                    ".breadcrumb-item.o_back_button a:contains(Employee Dicipline Types)",
                extra_trigger: "body:not(:has(.modal))",
            },

            // ── Post-Condition — The record no longer appears in the list.
            {
                content: "Deleted record no longer appears in the list",
                trigger:
                    ".o_list_view:not(:has(.o_data_row:contains(TOUR DICT DELETE)))",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
