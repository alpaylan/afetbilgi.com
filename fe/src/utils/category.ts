import { DataNode, QuestionNode, TreeNode } from '../interfaces/TreeNode';
import {
  Category,
  dataTypeToCategoryMap,
  TreeNodeType,
} from '../variables/TreeNode';

export const getCategoryOfTreeNode = (treeNode: TreeNode): Category => {
  if (treeNode.type === TreeNodeType.NODE_TYPE_DATA) {
    return (
      dataTypeToCategoryMap[(treeNode as DataNode).data.dataType] ??
      Category.OTHER
    );
  }

  const { options } = treeNode as QuestionNode;
  if (options.length === 0) {
    return Category.OTHER;
  }

  return getCategoryOfTreeNode(options[0].value);
};
