# Cancel Career Transition

> **Module:** `ssi_hr_career_transition`\
> **Model:** `employee_career_transition`\
> **Menu:** Human Resource > Career Management > Career Transition\
> **Actor:** user in group _Employee Career Transition - Workflow / Validator_ (`cancel_ok`
> policy)\
> **State:** `draft` | `confirm` | `done` → `cancel`\
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**, **Waiting for Approval**, or **Done**.
- **Record:** A **Done** record can only be cancelled while it is the latest done
  transition of the employee, unless it is an archive record.
- **Config:** An active `policy.template` for this model grants `cancel_ok` for that
  state to the actor's group.
- **Data:** At least one cancellation reason is available for this model.
- **Access:** User is in group _Employee Career Transition - Workflow / Validator_.

## Flow

1. Open the **Human Resource > Career Management > Career Transition** menu.
2. Open the record to cancel.
3. Click the **Cancel** button.
4. In the wizard that appears, select the **Cancellation Reason**.
5. Click **Confirm**.
6. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Cancelled**.
