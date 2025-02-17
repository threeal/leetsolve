import { globSync } from "glob";

export async function testSolutions(patterns: string[]): Promise<string[]> {
  const solutionFiles = patterns
    .map((pattern) => globSync(pattern))
    .flat()
    .sort();

  for (const solutionFile of solutionFiles) {

  }

  // TODO: It currently only returns the list of solution files.
  return solutionFiles;
}
