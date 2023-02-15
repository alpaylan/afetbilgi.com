# Adding a New Page to the Front-End Repository

## Step 1: Create a new .tsx page
To create a new page, navigate to the fe/src/data folder and create a new .tsx file with the desired name for your new page. You can use this new page to display data, forms, or other user interfaces.

## Step 2: Update TreeNode.tsx if necessary
If your new page requires a new interface for the data it uses, you need to update the TreeNode.tsx file located in the fe/src/components/TreeNode folder. This file contains the dataTypeToCategoryMap object, which maps each data type to a category.

## Step 3: Add translations
You should add translations for the new page in each language used in the project. Navigate to fe/src/utils/locales and add the necessary translations. You can use the useTranslation() hook to retrieve the translations. For more information on the useTranslation() hook, check out the official documentation.

## Step 4: Add related mapping
Finally, add the related mapping to the Data.tsx pageMappings object and the dataTypeToCategoryMap object in TreeNode.tsx. This will allow the new page to be displayed in the correct category in the project's navigation bar.

That's it! Your new page should now be added to the front-end repository and ready for use.