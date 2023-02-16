## Adding a New Page to the Front-End Repository

### Step 1: Create a new .tsx page

To create a new page, navigate to the [`fe/src/component/data`](../fe/src/componets/data) folder and create a new .tsx file with the desired name for your new page. You can use this new page to display data, forms, or other user interfaces.

### Step 2: Update TreeNode.ts if necessary

If your new page requires a new interface for the data it uses, you need to update the [`TreeNode.ts`](../fe/src/data/../interfaces/TreeNode.ts) file. This file contains the `dataTypeToCategoryMap` object, which maps each data type to a category.

### Step 3: Add translations

You should add translations for the new page in each language used in the project. Navigate to [`locales`](../fe/src/utils/locales) directory and add the necessary translations. You can use the `useTranslation()` hook to retrieve the translations. For more information on the `useTranslation()` hook, check out the [official documentation](https://react.i18next.com/latest/usetranslation-hook).

### Step 4: Add related mappings

Finally, add the related mapping to the [`Data.tsx`](../fe/src/components/Data.tsx) `pageMappings` object and the `dataTypeToCategoryMap` object in [`TreeNode.ts`](../fe/src/variables/TreeNode.ts). This will allow the new page to be displayed in the correct category in the project's navigation pane.
