# Create Award Reason

> **Module:** `ssi_hr_award`\
> **Model:** `hr.award_reason`\
> **Menu:** Human Resource > Configuration > Career > Employee Award Reasons\
> **Actor:** user in group _Employee Award Reason_

## Pre-Condition

- **Access:** User is in group _Employee Award Reason_.

## Flow

1. Open the **Human Resource > Configuration > Career > Employee Award Reasons** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the fields:
   - **Employee Award Reason** _(required)_: Enter a short name.
   - **Code** _(required)_: Enter a unique code. Enter **/** to leave the code to be
     generated later with the **Generate Code** button.
4. Click **Save**.

## Post-Condition

- A new award reason record is created and can be selected on **Employee Award**.
