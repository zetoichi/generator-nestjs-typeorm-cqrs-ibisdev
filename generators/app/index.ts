import Generator from "yeoman-generator";
import chalk from "chalk";

const TEMPLATE_PATH = "app.module.ts";
const DESTINATION_PATH = "public/app.module.ts";

interface NestGeneratorOpts {
  name: string;
}

export default class NestGenerator extends Generator {
  answers: { [index: string]: any };

  constructor(args: string | string[], opts: NestGeneratorOpts) {
    super(args, opts);
    this.argument("name", { type: String, required: false });
  }

  initializing() {
    this.log(chalk.italic("initializing"));
    this.log();
  }

  // async prompting() {
  //   this.answers = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Your project name"
  //     }
  //   ]);
  // }

  writing() {
    this.fs.copyTpl(
      this.templatePath(TEMPLATE_PATH),
      this.destinationPath(DESTINATION_PATH)
    );
  }
}
