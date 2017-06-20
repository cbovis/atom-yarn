"use babel";

import {
  CONFIG_KEY_SHOW_OUTPUT,
  CONFIG_KEY_HIDE_OUTPUT,
  CONFIG_KEY_BIN,
  SHOW_OUTPUT_NEVER,
  SHOW_OUTPUT_ALWAYS,
  SHOW_OUTPUT_LONG_RUNNING,
  HIDE_OUTPUT_NEVER,
  HIDE_OUTPUT_ALWAYS,
  HIDE_OUTPUT_ON_SUCCESS
} from "./constants";

const config = {};

config[CONFIG_KEY_BIN] = {
  title: "Executable Path",
  description: "Enter the path to your yarn executable.",
  type: "string",
  default: "yarn"
};

config[CONFIG_KEY_SHOW_OUTPUT] = {
  title: "Show Output Pane",
  description: "Choose when you would like to display the output pane.",
  type: "string",
  enum: [
    { value: SHOW_OUTPUT_NEVER, description: "Never" },
    { value: SHOW_OUTPUT_ALWAYS, description: "Always" },
    {
      value: SHOW_OUTPUT_LONG_RUNNING,
      description: "For long running commands"
    }
  ],
  default: SHOW_OUTPUT_LONG_RUNNING
};

config[CONFIG_KEY_HIDE_OUTPUT] = {
  title: "Hide Output Pane",
  description: "Choose when you would like to hide the output pane.",
  type: "string",
  enum: [
    { value: HIDE_OUTPUT_NEVER, description: "Never" },
    { value: HIDE_OUTPUT_ALWAYS, description: "Always" },
    {
      value: HIDE_OUTPUT_ON_SUCCESS,
      description: "On Success"
    }
  ],
  default: HIDE_OUTPUT_ON_SUCCESS
};

export default config;
