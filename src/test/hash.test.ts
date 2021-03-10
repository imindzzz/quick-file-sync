import { getFileHash } from "../Hash";
import * as Path from "path";

test("hash", async () => {
  expect(await getFileHash(Path.join(process.cwd(), ".gitignore"))).toBe(
    "124ea43ae774eb9cf75f2e460706f170c3f2d3efdc5d1e1f12faf1f5e27391fe"
  );
});
