# Restart Career Transition

> **Module:** `ssi_hr_career_transition`\
> **Model:** `employee_career_transition`\
> **Menu:** Human Resource > Career Management > Career Transition\
> **Actor:** user in group _Employee Career Transition - Workflow / Validator_ (`restart_ok`
> policy)\
> **State:** `cancel` | `reject` → `draft`\
> **Requires:** `10-cancel`

## Pre-Condition

- **Record:** Status is **Cancelled** or **Rejected**.
- **Config:** An active `policy.template` for this model grants `restart_ok` for that
  state to the actor's group.
- **Access:** User is in group _Employee Career Transition - Workflow / Validator_.

## Flow

1. Open the **Human Resource > Career Management > Career Transition** menu.
2. Open the record to restart.
3. Click the **Restart** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status returns to **Draft**.
- All approval records are removed and the approval template is cleared. A later Confirm
  starts the approval process from the beginning.
