// Copyright 2026 OpenSynergy Indonesia
// Copyright 2026 PT. Simetri Sinergi Indonesia
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
odoo.define("ssi_hr_award_documenso_signing.hr_award_approve_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_award/05-approve.md (E2a delta --
    // Modified Flow)
    // Navigation (open menu -> open record) is retraced from the base IK
    // Flow steps 1-2. The delta assertion, anchored at base Flow step 2,
    // verifies the Signature Requests tab injected because
    // `_documenso_signing_create_page = True`, then stops: base Flow
    // steps 3-4 (Approve / OK) are NOT exercised, since the fixture
    // leaves the Documenso Signing Template unconfigured, and the final
    // signed/rejected outcome is driven by the external Documenso
    // connector, which this tour never calls.
    tour.register(
        "ssi_hr_award_documenso_signing_approve",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Base Flow 1 — Open the Human Resource > Career Management >
            // Employee Awards menu.
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
                // Gate on the TARGET action title, not any list view.
                content: "Employee Awards list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Awards)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },

            // ── Base Flow 2 — Open the record to approve.
            {
                content: "Open the employee award",
                trigger: ".o_data_row:contains(TOUR AWDD APPROVE) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Employee award form is displayed",
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
                // Anchored on the group label: an empty many2one has no
                // text node and never matches `:visible`.
                content:
                    "Signature Requests tab shows the Approval Signing " +
                    "Request group",
                trigger: ".o_horizontal_separator:contains(Approval Signing Request)",
                run: function () {
                    // Assertion only; the tour stops here and never calls
                    // the external Documenso service.
                },
            },
        ]
    );
});
