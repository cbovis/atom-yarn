"use babel";

import reportError from "../report-error";
import YarnCommand from "../yarn/command";

const cleanCache = async () => {
  await new YarnCommand("cache", ["clean"], true).execute(null, {
    progressMessage: "Cleaning global package cache...",
    errorMessage:
      "An error occurred whilst cleaning global cache. See output for more information.",
    successMessage: "Global package cache has been cleaned"
  });
};

const confirmation = async () => {
  atom.confirm({
    message: "Are you sure you want to clean the global Yarn cache?",
    detailedMessage:
      "Cleaning your global package cache will force Yarn to download packages from the npm registry the next time a package is requested.",
    buttons: {
      "Clean Cache": () => {
        cleanCache().catch(reportError);
      },
      Cancel: null
    }
  });
};

export default confirmation;
