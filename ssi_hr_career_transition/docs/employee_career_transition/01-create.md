# Create Career Transition

> **Module:** `ssi_hr_career_transition`\
> **Model:** `employee_career_transition`\
> **Menu:** Human Resource > Career Management > Career Transition\
> **Actor:** user in group _Employee Career Transition - Workflow / User_\
> **State:** `—` → `draft`

## Pre-Condition

- **Data:** The employee exists.
- **Data:** A career transition type exists. To record a job grade change, the type has
  **Change Job Grade** enabled (and **Require Job Grade** if the new grade must always
  be filled).
- **Data:** The job grade to move the employee to exists.
- **Config:** An active `sequence.template` exists for this model.
- **Access:** User is in group _Employee Career Transition - Workflow / User_.

## Flow

1. Open the **Human Resource > Career Management > Career Transition** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the fields in the header:
   - **Employee** _(required)_: Select the employee whose career changes.
   - **Department**: Automatically filled from **Employee**. Read-only.
   - **Manager**: Automatically filled from **Employee**. Read-only.
   - **Job Position**: Automatically filled from **Employee**. Read-only.
   - **Career Transition Type** _(required)_: Select the transition type. It decides
     which of the **New** fields below can be changed.
   - **Reason** _(required if the type requires a reason)_: Select the reason. Available
     options are based on **Career Transition Type**.
   - **Contract Start Date** _(required for the contract transition type)_: Enter the
     contract start date. Only shown for the contract transition type.
   - **Contract End Date** _(required for the contract transition type)_: Enter the
     contract end date. Only shown for the contract transition type.
   - **Effective Date**: Enter the date the change takes effect.
   - **Archieve**: Tick only when recording a past transition that must not affect the
     current employee data.
   - **New Job Grade** _(required if the type has **Require Job Grade**)_: Select the
     new job grade. Automatically filled from the employee's current job grade. Change
     if needed. It stays read-only when the type does not have **Change Job Grade**.
4. In the **Career Transition Detail** tab, review the **Previous** column (including
   **Job Grade**) and fill in the **New** column:
   - **Company**, **Department**, **Manager**, **Job**, **Employment Status**:
     Automatically filled from the previous value of the employee. Change if needed.
     Each field can only be changed when the **Career Transition Type** allows it, and
     is required when the type requires it.
5. Click **Save**.

## Post-Condition

- A new Career Transition record is created in **Draft** status.
- **Previous Job Grade** shows the job grade the employee had when the record was
  created.
- Document number is still **/** (not yet generated).
