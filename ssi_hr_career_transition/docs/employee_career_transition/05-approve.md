# Approve Career Transition

> **Module:** `ssi_hr_career_transition`\
> **Model:** `employee_career_transition`\
> **Menu:** Human Resource > Career Management > Career Transition\
> **Actor:** approver on the pending approval level (group _Employee Career Transition -
> Workflow / Validator_)\
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

1. Open the **Human Resource > Career Management > Career Transition** menu.
2. Open the record to approve.
3. Click the **Approve** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- If all approval levels are fulfilled, status changes to **Done** automatically.
- The employee **Job Grade** follows **New Job Grade** of this transition when the
  employee work information method is **From Career Transition**.
- If there are still pending approval levels, status remains **Waiting for Approval**
  and the next level becomes pending.
