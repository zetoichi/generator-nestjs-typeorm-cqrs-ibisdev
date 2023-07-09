import Generator from "yeoman-generator";
import chalk from "chalk";

import {
  COMMAND_DEST_FOLDER,
  COMMAND_FILE_SUFFIX,
  COMMAND_TEMPLATE_PATH,
  COMMAND_HANDLER_DEST_FOLDER,
  COMMAND_HANDLER_FILE_SUFFIX,
  COMMAND_HANDLER_TEMPLATE_PATH,
  IConf,
  IHandlerAndImpl,
  HandlerType
} from "../../common";
import {
  kebabToPascal,
  createOrUpdateCqrsBarrels,
  getNames,
  makeCqrsFolders
} from "../../utils";

interface CommandGeneratorOpts {
  name: string;
  action: string;
}

export default class CommandGenerator extends Generator {
  conf: IConf = {};

  constructor(args: string | string[], opts: CommandGeneratorOpts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  initializing() {
    this.log(chalk.yellow("Generating Command..."));

    this.conf.names = getNames(this.options.name);

    this.conf.commandName = this._makeCommandName();
    this.conf.handlerName = `${this.conf.commandName}Handler`;
  }

  writing() {
    const suffixes = {
      handler: COMMAND_HANDLER_FILE_SUFFIX,
      impl: COMMAND_FILE_SUFFIX
    };
    const destFolders = {
      handler: COMMAND_HANDLER_DEST_FOLDER,
      impl: COMMAND_DEST_FOLDER
    };

    const [filenames, destPath] = makeCqrsFolders(
      this.options.action,
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
      HandlerType.Command
    );
  }

  _copyTemplates(destination: IHandlerAndImpl) {
    const templateOptions = { kebabToPascal, config: this.conf };

    this.fs.copyTpl(
      this.templatePath(COMMAND_HANDLER_TEMPLATE_PATH),
      this.destinationPath(destination.handler),
      templateOptions
    );
    this.fs.copyTpl(
      this.templatePath(COMMAND_TEMPLATE_PATH),
      this.destinationPath(destination.impl),
      templateOptions
    );
  }

  _makeCommandName(): string {
    return `${kebabToPascal(this.options.action)}${
      this.conf.names.pascal
    }Command`;
  }
}
