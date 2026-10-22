# Cancel Dicipline

> **Module:** `ssi_hr_dicipline`\
> **Model:** `hr.dicipline`\
> **Menu:** Human Resource > Career Management > Employee Diciplines\
> **Actor:** user in group _Employee Dicipline / Validator_ (`cancel_ok` policy)\
> **State:** `draft` | `confirm` | `done` → `cancel`\
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**, **Waiting for Approval**, or **Done**.
- **Config:** An active `policy.template` for this model grants `cancel_ok` for that
  state to the actor's group.
- **Data:** At least one cancellation reason is available for this model.
- **Access:** User is in group _Employee Dicipline / Validator_.

## Flow

1. Open the **Human Resource > Career Management > Employee Diciplines** menu.
2. Open the record to cancel.
3. Click the **Cancel** button.
4. In the wizard that appears, select the **Cancellation Reason**.
5. Click **Confirm**.
6. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Cancelled**.
