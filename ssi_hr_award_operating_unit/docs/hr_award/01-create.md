# Create Employee Award

> **Module:** `ssi_hr_award_operating_unit`
>
> **Extends:** ssi_hr_award — model `hr_award`, action `01-create`

## Additional Pre-Condition

- **Access:** The user is a member of the **Operating Unit / Multiple Operating Units**
  group (`operating_unit.group_multi_operating_unit`). Without this group the Operating
  Unit field described below is not rendered on the form — there is no error message,
  the field simply does not appear.
- **Module:** `ssi_hr_award_operating_unit` is installed.

## Additional Fields

When this module is installed, the create form gains one field, shown only to users in
the **Operating Unit / Multiple Operating Units** group
(`operating_unit.group_multi_operating_unit`):

- **Operating Unit**: The operating unit the award document belongs to. Displayed after
  the **Company** field. Automatically filled from the **Employee** when the employee is
  selected, and cleared if the employee is cleared.

## Modified — Record Visibility

- The Employee Awards list is filtered by operating unit (record rule). A user in the
  **Operating Unit** data ownership group of this module only sees award documents whose
  operating unit is in the list of operating units assigned to that user. This is not a
  Flow step.
