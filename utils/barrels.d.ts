import { Editor } from "mem-fs-editor";
import { HandlerType, IHandlerAndImpl } from "../common";
export declare const createOrUpdateCqrsBarrels: (fs: Editor, dest: IHandlerAndImpl, filenames: IHandlerAndImpl, handlerName: string, HandlerType: HandlerType) => void;
export declare const createOrUpdateIndexTs: (fs: Editor, dest: string, filename: string) => void;
