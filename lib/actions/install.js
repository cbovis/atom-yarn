"use babel";

import YarnCommand from "../yarn/command";

export default async function(projectFolder) {
  await new YarnCommand("install", null, true).execute(projectFolder, {
    progressMessage: "Updating dependencies...",
    errorMessage:
      "An error occurred whilst updating dependencies. See output for more information.",
    successMessage: "Dependencies have been updated"
  });
}
