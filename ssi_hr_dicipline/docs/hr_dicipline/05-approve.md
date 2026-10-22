# Approve Dicipline

> **Module:** `ssi_hr_dicipline`\
> **Model:** `hr.dicipline`\
> **Menu:** Human Resource > Career Management > Employee Diciplines\
> **Actor:** approver on the pending approval level (group _Employee Dicipline / Validator_)\
> **State:** `confirm` → `done`\
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** An active `policy.template` for this model grants `approve_ok` for state
  `confirm` to the actor's group.
- **Access:** User is registered as an approver on the approval level that is currently
  pending. When the template uses sequential approval, only the first unapproved level
  is pending.

## Flow

1. Open the **Human Resource > Career Management > Employee Diciplines** menu.
2. Open the record to approve.
3. Click the **Approve** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- If all approval levels are fulfilled, status changes to **Done** automatically.
- Document number is generated.
- If there are still pending approval levels, status remains **Waiting for Approval**
  and the next level becomes pending.
