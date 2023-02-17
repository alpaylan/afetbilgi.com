## Adding a new page to the frontend
### Data comes from the hot sheet:
1. Add/create the parser file to the [`data/parsers`](/data/parsers) folder.
2. Add run script to the [`.github/workflows/cron-data-upload.yaml`](/.github/workflows/cron-data-upload.yaml). Eg: `python ./new_parser.py ../latest_datasets/new_parser.json`
3. Add data type of the new page to the [`fe/src/variables/TreeNode.ts`](/fe/src/variables/TreeNode.ts) (Data type is specified in the parser file particularly for each page). Also add a category for the data type to the `dataTypeToCategoryMap`, which is in the same ts file. Category is not obligatory. If it is not specified, the new page will be in `OTHER` category.
4. Create the data node of the new page in the [`fe/src/interfaces/TreeNode.ts`](/fe/src/interfaces/TreeNode.ts) by looking at the json data (json data can be created by running the parser if it does not exist).
5. Create a new tsx file in the [`fe/src/components/data`](/fe/src/components/data) folder. And map this tsx file in the [`fe/src/components/Data.tsx`](/fe/src/components/Data.tsx) to the correct data type.
### Data comes from the cold sheet:
1. Add/create the json file to the [`data/datasets`](/data/datasets) folder.
2. Add the copy script to the [`.github/workflows/cron-data-upload.yaml`](/.github/workflows/cron-data-upload.yaml). Eg: `cp ../datasets/new_data.json ../latest_datasets/new_data.json`
3. Add data type of the new page to the [`fe/src/variables/TreeNode.ts`](/fe/src/variables/TreeNode.ts) (Data type is specified in the parser file particularly for each page). Also add a category for the data type to the “dataTypeToCategoryMap”, which is in the same ts file. Category is not obligatory. If it is not specified, the new page will be in “OTHER” category.
4. Create the data node of the new page in the [`fe/src/interfaces/TreeNode.ts`](/fe/src/interfaces/TreeNode.ts) by looking at the json data (json data can be created by running the parser if it does not exist).
5. Create a new tsx file in the [`fe/src/components/data`](/fe/src/components/data) folder. And map this tsx file in the [`fe/src/components/Data.tsx`](/fe/src/components/Data.tsx) to the correct data type.
