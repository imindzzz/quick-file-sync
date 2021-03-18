import { getFileHash } from "../Hash";
import * as Path from "path";

test("hash", async () => {
  expect(await getFileHash(Path.join(process.cwd(), ".gitignore"))).toBe(
    "60105d1b99500d19ff1d933690b3939a666f744440c651df06eb4b373ebc93fa"
  );
});
