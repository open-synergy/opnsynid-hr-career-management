# Finish Career Transition

> **Module:** `ssi_hr_career_transition`\
> **Model:** `employee_career_transition`\
> **Menu:** Human Resource > Career Management > Career Transition\
> **Actor:** user in group _Employee Career Transition - Workflow / User_ (`done_ok` policy)\
> **State:** `confirm` → `done`\
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** An active `policy.template` for this model grants `done_ok` for state
  `confirm` to the actor's group.
- **Access:** User is in group _Employee Career Transition - Workflow / User_.

## Flow

1. Open the **Human Resource > Career Management > Career Transition** menu.
2. Open the record to finish.
3. Click the **Done** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Done**.
- The employee **Job Grade** follows **New Job Grade** of this transition when the
  employee work information method is **From Career Transition**.
