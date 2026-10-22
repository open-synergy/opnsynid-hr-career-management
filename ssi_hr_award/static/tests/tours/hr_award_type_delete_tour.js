odoo.define("ssi_hr_award.hr_award_type_delete_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_award_type/03-delete.md
    tour.register(
        "ssi_hr_award_type_delete",
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

            // ── Flow 2 — Select the record to delete. The Action menu only
            // renders once a row is selected.
            {
                content: "Select the row",
                trigger:
                    ".o_data_row:contains(TOUR AWD TYPE DELETE) .o_list_record_selector input",
                run: "click",
            },

            // ── Flow 3 — Click Action > Delete.
            {
                content: "Open the Action menu",
                trigger: ".o_cp_action_menus button:contains(Action)",
            },
            {
                content: "Click Delete",
                // Match the exact label so ":contains(Delete)" never picks another
                // menu item.
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

            // ── Post-Condition — The record is removed from the list.
            {
                content: "Deleted record no longer appears in the list",
                trigger:
                    ".o_list_view:not(:has(.o_data_row:contains(TOUR AWD TYPE DELETE)))",
                extra_trigger: "body:not(:has(.modal))",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
