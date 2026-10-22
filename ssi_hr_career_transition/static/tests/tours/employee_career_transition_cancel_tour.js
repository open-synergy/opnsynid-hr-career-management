odoo.define(
    "ssi_hr_career_transition.employee_career_transition_cancel_tour",
    function (require) {
        "use strict";

        var tour = require("web_tour.tour");

        // IK: docs/employee_career_transition/10-cancel.md
        tour.register(
            "ssi_hr_career_transition_cancel",
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

                // ── Flow 2 — Open the record to cancel. The Pre-Condition record is
                // prepared in setUpClass for employee "TOUR CT CANCEL".
                {
                    content: "Open the career transition",
                    trigger: ".o_data_row:contains(TOUR CT CANCEL) .o_data_cell:first",
                    extra_trigger: ".o_list_view",
                },
                {
                    content: "Career transition form is displayed",
                    trigger: ".o_form_view",
                    run: function () {
                        // Assertion only; do not trigger the default click action.
                    },
                },

                // ── Flow 3 — Click the Cancel button. It is an action button whose
                // DOM name is a numeric action id, so it is targeted by its label.
                {
                    content: "Click the Cancel button",
                    trigger: ".o_statusbar_buttons button:enabled:contains(Cancel)",
                    extra_trigger: ".o_form_view",
                },
                {
                    // When a modal is open the tour scopes triggers INSIDE it, so
                    // triggers here are relative to the wizard modal.
                    content: "The cancellation reason wizard is displayed",
                    trigger: ".o_form_view",
                    run: function () {
                        // Assertion only; do not trigger the default click action.
                    },
                },

                // ── Flow 4 — Select the Cancellation Reason (radio widget).
                {
                    content: "Select the cancellation reason",
                    trigger:
                        ".o_field_widget[name='cancel_reason_id'] .o_radio_item label:contains(TOUR CT CANCEL REASON)",
                },

                // ── Flow 5 — Click Confirm.
                {
                    content: "Confirm the wizard",
                    trigger: ".modal-footer button[name='action_confirm']",
                },

                // ── Flow 6 — Click OK on the confirmation dialog.
                {
                    content: "Confirm the dialog",
                    trigger: ".modal-footer button.btn-primary",
                },

                // ── Post-Condition — Status changes to Cancelled.
                {
                    content: "Status is Cancelled",
                    trigger:
                        ".o_statusbar_status .o_arrow_button[data-value='cancel'].btn-primary",
                    extra_trigger: "body:not(:has(.modal))",
                    run: function () {
                        // Assertion only; do not trigger the default click action.
                    },
                },
            ]
        );
    }
);
