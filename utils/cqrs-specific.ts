import { IHandlerAndImpl } from "../common";

export const makeCqrsFolders = (
  action: string,
  kebab: string,
  suffixes: IHandlerAndImpl,
  destFolders: IHandlerAndImpl
): [IHandlerAndImpl, IHandlerAndImpl] => {
  const filenames = {
    handler: makeFileName(action, kebab, suffixes.handler),
    impl: makeFileName(action, kebab, suffixes.impl)
  };

  const dest = {
    handler: makeDestinationPath(destFolders.handler, filenames.handler),
    impl: makeDestinationPath(destFolders.impl, filenames.impl)
  };

  return [filenames, dest];
};

export const makeFileName = (action: string, kebab: string, suffix: string) => {
  return `${action}-${kebab}.${suffix}`;
};

export const makeDestinationPath = (folder: string, filename: string) => {
  return `${folder}${filename}`;
};
