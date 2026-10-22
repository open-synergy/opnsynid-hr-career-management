# Create Dicipline

> **Module:** `ssi_hr_dicipline`\
> **Model:** `hr.dicipline`\
> **Menu:** Human Resource > Career Management > Employee Diciplines\
> **Actor:** user in group _Employee Dicipline / User_\
> **State:** `—` → `draft`

## Pre-Condition

- **Data:** The employee exists.
- **Data:** A dicipline type exists.
- **Data:** At least one dicipline reason exists.
- **Config:** An active `sequence.template` exists for this model.
- **Access:** User is in group _Employee Dicipline / User_.

## Flow

1. Open the **Human Resource > Career Management > Employee Diciplines** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the fields in the header:
   - **Employee** _(required)_: Select the employee who receives the disciplinary
     action.
   - **Department**: Automatically filled from **Employee**. Read-only.
   - **Manager**: Automatically filled from **Employee**. Read-only.
   - **Job Position**: Automatically filled from **Employee**. Read-only.
   - **Date Start** _(required)_: Enter the date the disciplinary action starts.
   - **Date End** _(required)_: Enter the date the disciplinary action ends. It cannot
     be earlier than **Date Start**.
   - **Date Dicipline** _(required)_: Enter the date of the disciplinary action.
   - **Type** _(required)_: Select the dicipline type.
   - **Reason** _(required)_: Select one or more dicipline reasons.
4. Click **Save**.

## Post-Condition

- A new Dicipline record is created in **Draft** status.
- Document number is still **/** (not yet generated).
