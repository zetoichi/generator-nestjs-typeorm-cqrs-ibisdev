import Generator from "yeoman-generator";
import { IConf } from "../common";
interface EntityGeneratorOpts {
    name: string;
}
export declare class EntityGenerator extends Generator {
    conf: IConf;
    constructor(args: string | string[], opts: EntityGeneratorOpts);
    initializing(): void;
    writing(): void;
}
export {};
