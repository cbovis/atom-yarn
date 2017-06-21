"use babel";

import path from "path";
import YarnCommand from "../yarn/command";

export default async function(projectFolder) {
  await new YarnCommand("init", ["--yes"]).execute(projectFolder, {
    errorMessage:
      "An error occurred whilst initializing. See output for more information.",
    successMessage: "Created package.json with default values"
  });

  atom.workspace.open(path.join(projectFolder, "package.json"));
}
