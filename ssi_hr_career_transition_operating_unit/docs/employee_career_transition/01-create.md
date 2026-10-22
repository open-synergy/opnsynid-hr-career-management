# Create Career Transition

> **Module:** `ssi_hr_career_transition_operating_unit`
>
> **Extends:** ssi_hr_career_transition — model `employee_career_transition`, action
> `01-create`

## Additional Pre-Condition

- **Access:** The user is a member of the **Operating Unit / Multiple Operating Units**
  group (`operating_unit.group_multi_operating_unit`). Without this group the Operating
  Unit field described below is not rendered on the form — there is no error message,
  the field simply does not appear.
- **Module:** `ssi_hr_career_transition_operating_unit` is installed.

## Additional Fields

When this module is installed, the create form gains one field, shown only to users in
the **Operating Unit / Multiple Operating Units** group
(`operating_unit.group_multi_operating_unit`):

- **Operating Unit**: The operating unit the career transition document belongs to.
  Displayed after the **Company** field. Can only be changed while the document is in
  the **Draft** state; once the document leaves Draft, the field becomes read-only.

## Modified — Record Visibility

- The Career Transition list is filtered by operating unit (record rule). A user in the
  **Operating Unit** data ownership group of this module only sees career transition
  documents whose operating unit is in the list of operating units assigned to that
  user. This is not a Flow step.
