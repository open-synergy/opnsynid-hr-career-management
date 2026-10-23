# Create Dicipline

> **Module:** `ssi_hr_dicipline_operating_unit`
>
> **Extends:** ssi_hr_dicipline — model `hr.dicipline`, action `01-create`

## Additional Pre-Condition

- **Access:** The user is a member of the **Operating Unit / Multiple Operating Units**
  group (`operating_unit.group_multi_operating_unit`). Without this group the Operating
  Unit field described below is not rendered on the form — there is no error message,
  the field simply does not appear.
- **Module:** `ssi_hr_dicipline_operating_unit` is installed.

## Additional Fields

When this module is installed, the create form gains one field, shown only to users in
the **Operating Unit / Multiple Operating Units** group
(`operating_unit.group_multi_operating_unit`):

- **Operating Unit**: The operating unit the dicipline belongs to. Displayed after the
  **Company** field. Automatically filled from the **Operating Unit** of the selected
  **Employee**, and cleared when the **Employee** is cleared.

## Modified — Record Visibility

- The Dicipline list is filtered by operating unit (record rule). A user in the
  **Operating Unit** data ownership group of this module only sees diciplines whose
  operating unit is in the list of operating units assigned to that user. This is not a
  Flow step.
