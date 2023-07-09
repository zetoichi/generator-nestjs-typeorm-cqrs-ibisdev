import { IConf } from "../common";
import Generator from "yeoman-generator";
interface DtoGeneratorOpts {
    name: string;
}
export declare class DtoGenerator extends Generator {
    conf: IConf;
    constructor(args: string | string[], opts: DtoGeneratorOpts);
    initializing(): void;
    writing(): void;
}
export {};
