import { FileDirHashTree } from "./FileTree";
interface DiffAction {
  action: "del";
  obj: FileDirHashTree;
}
export const diffArray = (
  tree1: FileDirHashTree[],
  tree2: FileDirHashTree[]
) => {
  const actions: DiffAction[] = [];
  tree1.forEach((x) => {
    const y = tree2.find((y) => x.type === x.type && x.path === y.path);
    if (y) {
      if (x.hash !== y.hash) {
        actions.push(...diffTree(x, y));
      } else {
      }
    } else {
      actions.push({
        action: "del",
        obj: x,
      });
    }
  });

  // TODO 考虑tree2

  return actions;
};

export const diffTree = (tree1: FileDirHashTree, tree2: FileDirHashTree) => {
  if (tree1.hash === tree2.hash) {
    return [];
  }
  //   if (!tree1.children && !tree2.children) {
  //     return [];
  //   }
  return diffArray(tree1.children || [], tree2.children || []);
};
