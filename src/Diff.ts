import { FileDirHashTree } from "./FileTree";
interface DiffAction {
  obj: FileDirHashTree;
}
const diffArray = (tree1: FileDirHashTree[], tree2: FileDirHashTree[]) => {
  const actions: DiffAction[] = [];
  tree1.forEach((x) => {
    const y = tree2.find((y) => x.type === x.type && x.path === y.path);
    if (y) {
      if (x.hash !== y.hash) {
        if (x.children.length !== 0 && y.children.length !== 0) {
          const res = diffTree(x, y);
          actions.push(...res[0]);
        } else {
          actions.push({
            obj: {
              ...x,
              children: [],
            },
          });
        }
      } else {
        // 完全一致
      }
    } else {
      actions.push({
        obj: {
          ...x,
          children: [],
        },
      });
    }
  });
  return actions;
};

/**
 * 对比两棵树，
 * @param tree1
 * @param tree2
 * @returns 二维数组，输出为两棵树分别多出的文件
 */
export const diffTree = (tree1: FileDirHashTree, tree2: FileDirHashTree) => {
  if (tree1.hash === tree2.hash) {
    return [];
  }
  const a = diffArray(tree1.children, tree2.children);
  const b = diffArray(tree2.children, tree1.children);
  return [a, b];
};
