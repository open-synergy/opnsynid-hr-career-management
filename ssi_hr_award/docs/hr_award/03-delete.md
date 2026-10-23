# Delete Employee Award

> **Module:** `ssi_hr_award`\
> **Model:** `hr.award`\
> **Menu:** Human Resource > Career Management > Employee Awards\
> **Actor:** user in group _Employee Award / User_\
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Record:** Document number is still **/** (not yet generated).
- **Access:** User is in group _Employee Award / User_.

## Flow

1. Open the **Human Resource > Career Management > Employee Awards** menu.
2. Find and open the record to delete.
3. Click **Action** > **Delete**.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- The record is permanently removed and no longer appears in the list.
