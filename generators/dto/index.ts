import {
  DTO_FILE_SUFFIX,
  DTO_DEST_FOLDER,
  DTO_TEMPLATE_PATH,
  IConf
} from "../../common";
import Generator from "yeoman-generator";
import chalk from "chalk";
import { kebabToPascal } from "../../utils/case-change";
import { getNames } from "../../utils";

interface DtoGeneratorOpts {
  name: string;
}

export default class DtoGenerator extends Generator {
  conf: IConf = {};

  constructor(args: string | string[], opts: DtoGeneratorOpts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
  }

  initializing() {
    this.log(chalk.yellow("Generating Dto..."));

    this.conf.names = getNames(this.options.name);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(DTO_TEMPLATE_PATH),
      this.destinationPath(
        `${DTO_DEST_FOLDER}${this.options.name}.${DTO_FILE_SUFFIX}`
      ),
      { kebabToPascal, config: this.conf }
    );
  }
}
