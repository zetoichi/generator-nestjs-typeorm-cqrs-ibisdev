import Generator from "yeoman-generator";
import chalk from "chalk";
import { getNames, kebabToPascal } from "../utils";
import {
  IConf,
  INTERFACE_DEST_FOLDER,
  INTERFACE_FILE_SUFFIX,
  INTERFACE_TEMPLATE_PATH
} from "../common";

interface InterfaceGeneratorOpts {
  name: string;
}

export class InterfaceGenerator extends Generator {
  conf: IConf = {};

  constructor(args: string | string[], opts: InterfaceGeneratorOpts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  initializing() {
    this.log(chalk.yellow("Generating Interface..."));

    this.conf.names = getNames(this.options.name);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(INTERFACE_TEMPLATE_PATH),
      this.destinationPath(
        `${INTERFACE_DEST_FOLDER}${this.options.name}.${INTERFACE_FILE_SUFFIX}`
      ),
      { kebabToPascal, config: this.conf }
    );
  }
}
