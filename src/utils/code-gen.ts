import { Editor } from "mem-fs-editor";
import { parse, print, types } from "recast";
import { parse as babelParser, ParserOptions } from "@babel/parser";
import prettier from "prettier";

import { HandlerType } from "../common";

const { builders: b } = types;

const PARSER_OPTS: ParserOptions = {
  sourceType: "module",
  plugins: ["typescript"]
};

export const createOrUpdateArrayIndexTs = (
  fs: Editor,
  destFolder: string,
  filename: string,
  handlerName: string,
  handlerType: HandlerType
): void => {
  const path = `${destFolder}index.ts`;
  const identifier = `${handlerType}Handlers`;

  if (!fs.exists(path)) {
    createArrayIndexTs(fs, path, identifier);
  }

  updateArrayIndexTs(fs, path, handlerName, filename, identifier);
};

const createArrayIndexTs = (
  fs: Editor,
  destFolder: string,
  identifier: string
): void => {
  const ast = parse(`export const ${identifier} = [];`, {
    parser: {
      parse: source => babelParser(source, PARSER_OPTS)
    }
  });

  const code = print(ast).code;

  fs.write(destFolder, code);
};

const updateArrayIndexTs = (
  fs: Editor,
  destFolder: string,
  handlerName: string,
  filename: string,
  identifier: string
): void => {
  let code = fs.read(destFolder);

  const ast = parse(code, {
    parser: {
      parse: source => babelParser(source, PARSER_OPTS)
    }
  });

  const newImport = b.importDeclaration(
    [b.importSpecifier(b.identifier(handlerName))],
    b.literal(`./${filename}`)
  );
  ast.program.body.unshift(newImport);

  const handlersDeclaration = ast.program.body.find(
    node =>
      node.type === "ExportNamedDeclaration" &&
      node.declaration.declarations[0].id.name === identifier
  );

  if (handlersDeclaration) {
    handlersDeclaration.declaration.declarations[0].init.elements.push(
      b.identifier(handlerName)
    );
  }

  let newCode = print(ast).code;

  newCode = prettier.format(newCode, { parser: "typescript" });

  fs.write(destFolder, newCode);
};
