import Generator from "yeoman-generator";
import { IConf } from "../common";
interface ModuleGeneratorOpts {
    name: string;
}
export declare class ModuleGenerator extends Generator {
    conf: IConf;
    constructor(args: string | string[], opts: ModuleGeneratorOpts);
    initializing(): void;
    writing(): void;
}
export {};
