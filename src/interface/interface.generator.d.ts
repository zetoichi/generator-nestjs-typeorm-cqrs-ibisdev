import Generator from "yeoman-generator";
import { IConf } from "../common";
interface InterfaceGeneratorOpts {
    name: string;
}
export declare class InterfaceGenerator extends Generator {
    conf: IConf;
    constructor(args: string | string[], opts: InterfaceGeneratorOpts);
    initializing(): void;
    writing(): void;
}
export {};
