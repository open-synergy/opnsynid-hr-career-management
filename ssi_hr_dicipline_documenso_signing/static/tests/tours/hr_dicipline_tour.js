// Copyright 2026 OpenSynergy Indonesia
// Copyright 2026 PT. Simetri Sinergi Indonesia
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
odoo.define("ssi_hr_dicipline_documenso_signing.hr_dicipline_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline/05-approve.md (E2a delta -- Modified Flow)
    // Navigation (open menu -> open record) is retraced from the base IK
    // ssi_hr_dicipline/docs/hr_dicipline/05-approve.md Flow steps 1-2.
    // The delta assertion verifies the Signature Requests tab injected
    // because `_documenso_signing_create_page = True`, then stops: the
    // tour never clicks Approve and never calls the external Documenso
    // service.
    tour.register(
        "ssi_hr_dicipline_documenso_signing_hr_dicipline_approve",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Base Flow 1 — Open the Employee Diciplines menu.
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
                // Gate on the TARGET action title, not any list view.
                content: "Employee Diciplines list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Diciplines)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Base Flow 2 — Open the record to approve.
            {
                content: "Open the dicipline",
                trigger:
                    ".o_data_row:contains(TOUR DIC DOC APPROVE) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Dicipline form is displayed",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Delta assertion (anchor: base Flow step 2).
            {
                content: "Open the Signature Requests tab",
                trigger: ".o_notebook .nav-link:contains(Signature Requests)",
            },
            {
                // Anchored on the group label: the empty many2one has no
                // text node and would never match `:visible`.
                content:
                    "Signature Requests tab shows the Approval Signing Request group",
                trigger: ".o_horizontal_separator:contains(Approval Signing Request)",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ]
    );
});
