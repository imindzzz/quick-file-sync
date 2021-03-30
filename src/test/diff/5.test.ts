import * as Path from "path";
import * as fs from "fs";
import { diffTree } from "../../Diff";
import { buildFileDir, buildTree, rmDir } from "../../FileTree";

test("服务器新增了目录/本地删除了目录", async () => {
    const testPathRoot = Path.join(process.cwd(), ".test_temp" + Math.random());
  rmDir(testPathRoot);
  fs.mkdirSync(testPathRoot);

  buildFileDir(
    {
      type: "dir",
      name: "local",
      content: "",
      children: [{ type: "file", name: "1.txt", content: "111", children: [] }],
    },
    testPathRoot
  );
  buildFileDir(
    {
      type: "dir",
      name: "server",
      content: "",
      children: [
        {
          type: "file",
          name: "1.txt",
          content: "111",
          children: [],
        },
        {
          type: "dir",
          name: "newdir",
          content: "222",
          children: [
            { type: "file", name: "2.txt", content: "222", children: [] },
          ],
        },
      ],
    },
    testPathRoot
  );

  const tree1 = await buildTree(Path.join(testPathRoot, "local"));
  const tree2 = await buildTree(Path.join(testPathRoot, "server"));

  const diff = diffTree(tree1, tree2);

  rmDir(testPathRoot);

  expect(diff.length).toBe(2);
  expect(diff[1][0].obj.path.endsWith("newdir")).toBe(true);
});
