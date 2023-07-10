import Generator from "yeoman-generator";
import { IConf } from "../common";
interface ControllerGeneratorOpts {
    name: string;
}
export declare class ControllerGenerator extends Generator {
    conf: IConf;
    constructor(args: string | string[], opts: ControllerGeneratorOpts);
    initializing(): void;
    writing(): void;
}
export {};
