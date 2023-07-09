import { Editor } from "mem-fs-editor";
import { HandlerType, IHandlerAndImpl } from "../common";
import { createOrUpdateArrayIndexTs } from "./code-gen";

export const createOrUpdateCqrsBarrels = (
  fs: Editor,
  dest: IHandlerAndImpl,
  filenames: IHandlerAndImpl,
  handlerName: string,
  HandlerType: HandlerType
): void => {
  createOrUpdateIndexTs(fs, dest.impl, filenames.impl);
  createOrUpdateArrayIndexTs(
    fs,
    dest.handler,
    filenames.handler,
    handlerName,
    HandlerType
  );
};

export const createOrUpdateIndexTs = (
  fs: Editor,
  dest: string,
  filename: string
): void => {
  const path = `${dest}index.ts`;

  append(fs, path, `export * from "./${filename}";`);
};

const append = (fs: Editor, path: string, content: string): void => {
  if (fs.exists(path)) {
    fs.append(path, `\n${content}`);
  } else {
    fs.write(path, content);
  }
};
