# Create Employee Award

> **Module:** `ssi_hr_award`\
> **Model:** `hr.award`\
> **Menu:** Human Resource > Career Management > Employee Awards\
> **Actor:** user in group _Employee Award / User_\
> **State:** `—` → `draft`

## Pre-Condition

- **Data:** The employee exists.
- **Data:** An award type exists (see `docs/hr_award_type/01-create.md`).
- **Data:** At least one award reason exists (see `docs/hr_award_reason/01-create.md`).
- **Config:** An active `sequence.template` exists for this model.
- **Access:** User is in group _Employee Award / User_.

## Flow

1. Open the **Human Resource > Career Management > Employee Awards** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the fields in the header:
   - **Employee** _(required)_: Select the employee who receives the award.
   - **Department**: Automatically filled from **Employee**. Read-only.
   - **Manager**: Automatically filled from **Employee**. Read-only.
   - **Job Position**: Automatically filled from **Employee**. Read-only.
   - **Date Start** _(required)_: Enter the first day of the award period.
   - **Date End** _(required)_: Enter the last day of the award period. It cannot be
     earlier than **Date Start**.
   - **Date Award** _(required)_: Enter the date the award is given.
   - **Type** _(required)_: Select the award type.
   - **Reason** _(required)_: Select one or more award reasons.
4. Click **Save**.

## Post-Condition

- A new Employee Award record is created in **Draft** status.
- Document number is still **/** (not yet generated). It is generated when the award is
  approved and becomes **Done**.
