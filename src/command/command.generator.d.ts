import Generator from "yeoman-generator";
import { IConf, IHandlerAndImpl } from "../common";
interface CommandGeneratorOpts {
    name: string;
    action: string;
}
export declare class CommandGenerator extends Generator {
    conf: IConf;
    constructor(args: string | string[], opts: CommandGeneratorOpts);
    initializing(): void;
    writing(): void;
    _copyTemplates(destination: IHandlerAndImpl): void;
    _makeCommandName(): string;
}
export {};
