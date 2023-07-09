import Generator from "yeoman-generator";
import chalk from "chalk";
import { kebabToPascal } from "../../utils/case-change";
import { getNames } from "../../utils";
import {
  IConf,
  MODULE_DEST_FOLDER,
  MODULE_FILE_SUFFIX,
  MODULE_TEMPLATE_PATH
} from "../../common";

interface ModuleGeneratorOpts {
  name: string;
}

export default class ModuleGenerator extends Generator {
  conf: IConf = {};

  constructor(args: string | string[], opts: ModuleGeneratorOpts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  initializing() {
    this.log(chalk.yellow("Generating Module..."));

    this.conf.names = getNames(this.options.name);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(MODULE_TEMPLATE_PATH),
      this.destinationPath(
        `${MODULE_DEST_FOLDER}${this.options.name}.${MODULE_FILE_SUFFIX}`
      ),
      { kebabToPascal, config: this.conf }
    );
  }
}
