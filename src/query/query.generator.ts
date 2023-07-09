import Generator from "yeoman-generator";
import chalk from "chalk";

import {
  QUERY_DEST_FOLDER,
  QUERY_FILE_SUFFIX,
  QUERY_TEMPLATE_PATH,
  QUERY_HANDLER_DEST_FOLDER,
  QUERY_HANDLER_FILE_SUFFIX,
  QUERY_HANDLER_TEMPLATE_PATH,
  IConf,
  IHandlerAndImpl,
  HandlerType
} from "../common";
import {
  kebabToPascal,
  createOrUpdateCqrsBarrels,
  getNames,
  makeCqrsFolders
} from "../utils";


const ACTION = "get"

interface QueryGeneratorOpts {
  name: string;
}

export class QueryGenerator extends Generator {
  conf: IConf = {};

  constructor(args: string | string[], opts: QueryGeneratorOpts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  initializing() {
    this.log(chalk.yellow("Generating Query..."));

    this.conf.names = getNames(this.options.name);

    this.conf.queryName = this._makeQueryName();
    this.conf.handlerName = `${this.conf.queryName}Handler`;
  }

  writing() {
    const suffixes = {
      handler: QUERY_HANDLER_FILE_SUFFIX,
      impl: QUERY_FILE_SUFFIX
    };
    const destFolders = {
      handler: QUERY_HANDLER_DEST_FOLDER,
      impl: QUERY_DEST_FOLDER
    };

    const [filenames, destPath] = makeCqrsFolders(
      ACTION,
      this.conf.names.kebab,
      suffixes,
      destFolders
    );

    this._copyTemplates(destPath);

    createOrUpdateCqrsBarrels(
      this.fs,
      destFolders,
      filenames,
      this.conf.handlerName,
      HandlerType.Query
    );
  }

  _copyTemplates(destination: IHandlerAndImpl) {
    const templateOptions = { kebabToPascal, config: this.conf };

    this.fs.copyTpl(
      this.templatePath(QUERY_HANDLER_TEMPLATE_PATH),
      this.destinationPath(destination.handler),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath(QUERY_TEMPLATE_PATH),
      this.destinationPath(destination.impl),
      templateOptions
    );
  }

  _makeQueryName(): string {
    return `${kebabToPascal(ACTION)}${
      this.conf.names.pascal
    }Query`;
  }
}
