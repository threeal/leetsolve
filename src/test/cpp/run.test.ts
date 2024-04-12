import { jest } from "@jest/globals";
import "jest-extended";

jest.unstable_mockModule("node:child_process", () => ({
  execSync: jest.fn(),
}));

it("should run a C++ test executable", async () => {
  const { execSync } = await import("node:child_process");
  const { runCppTest } = await import("./run.js");

  jest.mocked(execSync).mockClear();

  await expect(runCppTest("build/path/to/test")).resolves.toBeUndefined();

  expect(execSync).toHaveBeenCalledExactlyOnceWith("build/path/to/test", {
    stdio: "pipe",
  });
});

it("should run a C++ test executable on Windows", async () => {
  const { execSync } = await import("node:child_process");
  const { runCppTest } = await import("./run.js");

  jest.mocked(execSync).mockClear();
  Object.defineProperty(process, "platform", { value: "win32" });

  await expect(runCppTest("build/path/to/test")).resolves.toBeUndefined();

  expect(execSync).toHaveBeenCalledExactlyOnceWith("start build/path/to/test", {
    stdio: "pipe",
  });
});
