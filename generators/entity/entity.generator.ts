import chalk from "chalk";

import Generator from "yeoman-generator";
import { getNames, kebabToPascal } from "../../utils";
import {
  ENTITY_DEST_FOLDER,
  ENTITY_FILE_SUFFIX,
  ENTITY_TEMPLATE_PATH,
  IConf
} from "../../common";

interface EntityGeneratorOpts {
  name: string;
}

export class EntityGenerator extends Generator {
  conf: IConf = {};

  constructor(args: string | string[], opts: EntityGeneratorOpts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  initializing() {
    this.log(chalk.yellow("Generating Entity..."));

    this.conf.names = getNames(this.options.name);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(ENTITY_TEMPLATE_PATH),
      this.destinationPath(
        `${ENTITY_DEST_FOLDER}${this.options.name}.${ENTITY_FILE_SUFFIX}`
      ),
      { kebabToPascal, config: this.conf }
    );
  }
}
