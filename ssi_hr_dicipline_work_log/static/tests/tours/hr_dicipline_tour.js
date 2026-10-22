/* Copyright 2026 OpenSynergy Indonesia
 * Copyright 2026 PT. Simetri Sinergi Indonesia
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl). */
odoo.define("ssi_hr_dicipline_work_log.hr_dicipline_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/hr_dicipline/01-create.md
    tour.register(
        "ssi_hr_dicipline_work_log_hr_dicipline_create",
        {
            test: true,
            url: "/web",
        },
        [
            // Base Flow 1 — Open the Human Resource > Career Management >
            // Employee Diciplines menu.
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
                // Gate on the TARGET action title, not a generic list view.
                content: "Employee Diciplines list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Employee Diciplines)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click.
                },
            },

            // Base Flow 2 — Click the New button. (14.0: "Create")
            {
                content: "Click Create",
                trigger: ".o_list_button_add",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Form is open in edit mode",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only; do not trigger the default click.
                },
            },

            // Additional Fields (docs/hr_dicipline/01-create.md, delta of
            // ssi_hr_dicipline_work_log) — the Work Log tab added by
            // mixin.work_object is rendered on the create form. Delta-only
            // tour: it stops here and does not fill any field.
            {
                content: "Work Log tab is displayed",
                trigger: ".o_notebook .nav-link:contains(Work Log)",
                run: function () {
                    // Assertion only; do not trigger the default click.
                },
            },
        ]
    );
});
