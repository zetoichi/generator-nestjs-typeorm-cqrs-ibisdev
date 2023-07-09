import Generator from "yeoman-generator";
import chalk from "chalk";
import { kebabToPascal } from "../../utils/case-change";
import { getNames } from "../../utils";
import {
  CONTROLLER_DEST_FOLDER,
  CONTROLLER_FILE_SUFFIX,
  CONTROLLER_TEMPLATE_PATH,
  IConf
} from "../../../common";

interface ControllerGeneratorOpts {
  name: string;
}

export class ControllerGenerator extends Generator {
  conf: IConf = {};

  constructor(args: string | string[], opts: ControllerGeneratorOpts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  initializing() {
    this.log(chalk.yellow("Generating Controller..."));

    this.conf.names = getNames(this.options.name);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(CONTROLLER_TEMPLATE_PATH),
      this.destinationPath(
        `${CONTROLLER_DEST_FOLDER}${this.options.name}.${CONTROLLER_FILE_SUFFIX}`
      ),
      { kebabToPascal, config: this.conf }
    );
  }
}
