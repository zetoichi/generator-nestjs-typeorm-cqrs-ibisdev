import { IHandlerAndImpl } from "../common";
export declare const makeCqrsFolders: (action: string, kebab: string, suffixes: IHandlerAndImpl, destFolders: IHandlerAndImpl) => [IHandlerAndImpl, IHandlerAndImpl];
export declare const makeFileName: (action: string, kebab: string, suffix: string) => string;
export declare const makeDestinationPath: (folder: string, filename: string) => string;
