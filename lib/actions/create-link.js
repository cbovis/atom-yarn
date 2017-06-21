"use babel";

import getPackageJson from "../yarn/get-package-json";
import YarnCommand from "../yarn/command";

export default async function(projectFolder) {
  const packageJson = await getPackageJson(projectFolder);

  await new YarnCommand("link").execute(projectFolder, {
    errorMessage:
      "An error occurred whilst creating link. See output for more information.",
    successMessage: `Linked ${packageJson.name} package to ${projectFolder}`
  });
}
