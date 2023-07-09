import Generator from "yeoman-generator";
interface NestGeneratorOpts {
    name: string;
}
export declare class GeneratorNestCqrsTypeormApp extends Generator {
    answers: {
        [index: string]: any;
    };
    constructor(args: string | string[], opts: NestGeneratorOpts);
    initializing(): void;
    writing(): void;
}
export {};
