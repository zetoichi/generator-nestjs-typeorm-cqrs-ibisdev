import Generator from "yeoman-generator";
import { IConf, IHandlerAndImpl } from "../common";
interface QueryGeneratorOpts {
    name: string;
}
export declare class QueryGenerator extends Generator {
    conf: IConf;
    constructor(args: string | string[], opts: QueryGeneratorOpts);
    initializing(): void;
    writing(): void;
    _copyTemplates(destination: IHandlerAndImpl): void;
    _makeQueryName(): string;
}
export {};
