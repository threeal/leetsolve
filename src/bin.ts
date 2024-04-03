#!/usr/bin/env node

import yargs from "yargs";
import { globSync } from "glob";
import { Listr, ListrTask } from "listr2";
import { hideBin } from "yargs/helpers";
import { createTestCppSolutionTasks } from "./test/cpp.js";

yargs(hideBin(process.argv))
  .scriptName("leettest")
  .version("0.1.0")
  .command(
    "$0",
    "Compile and test solutions to LeetCode problems",
    (yargs) => yargs,
    async () => {
      const solutionFiles = globSync("**/solution.cpp");
      const task = new Listr(
        solutionFiles.sort().map(
          (solutionFile): ListrTask => ({
            title: `Testing ${solutionFile}...`,
            task: (ctx, task) =>
              task.newListr(createTestCppSolutionTasks(solutionFile), {
                concurrent: false,
                exitOnError: true,
              }),
          }),
        ),
        {
          concurrent: true,
          exitOnError: false,
          rendererOptions: {
            collapseErrors: false,
            removeEmptyLines: false,
          },
        },
      );

      try {
        await task.run();
      } catch (err) {
        console.error(err);
      }
    },
  )
  .parse();
