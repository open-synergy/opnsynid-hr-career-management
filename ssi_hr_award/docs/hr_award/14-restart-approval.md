# Restart Approval Process of Employee Award

> **Module:** `ssi_hr_award`\
> **Model:** `hr.award`\
> **Menu:** Human Resource > Career Management > Employee Awards\
> **Actor:** user in group _Employee Award / Validator_ (`restart_approval_ok` policy)\
> **State:** `confirm` → `confirm`\
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Record:** The record has no approval template assigned, so the approval process is
  stalled without any approver. The button is hidden while an approval template is
  assigned.
- **Config:** An active `approval.template` for this model matches this record and has
  at least one approver level.
- **Config:** An active `policy.template` for this model grants `restart_approval_ok`
  for state `confirm` to the actor's group.
- **Access:** User is in group _Employee Award / Validator_.

## Flow

1. Open the **Human Resource > Career Management > Employee Awards** menu.
2. Open the record whose approval process is stalled.
3. Click the **Restart Approval Process** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status remains **Waiting for Approval**.
- The **Approvals** tab shows the approval list newly formed from the approval template.
