"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-ibis-nestjs-typeorm-cqrs:command", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/command"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file(["dummyfile.txt"]);
  });
});
