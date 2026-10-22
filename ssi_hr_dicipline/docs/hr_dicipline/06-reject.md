# Reject Dicipline

> **Module:** `ssi_hr_dicipline`\
> **Model:** `hr.dicipline`\
> **Menu:** Human Resource > Career Management > Employee Diciplines\
> **Actor:** approver on the pending approval level (group _Employee Dicipline / Validator_)\
> **State:** `confirm` → `reject`\
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** An active `policy.template` for this model grants `reject_ok` for state
  `confirm` to the actor's group.
- **Access:** User is registered as an approver on the approval level that is currently
  pending.

## Flow

1. Open the **Human Resource > Career Management > Employee Diciplines** menu.
2. Open the record to reject.
3. Click the **Reject** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Rejected**.
