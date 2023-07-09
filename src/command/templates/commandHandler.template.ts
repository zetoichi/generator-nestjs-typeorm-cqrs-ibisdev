import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { cyanBright } from "cli-color";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional";

import { <%= config.names.entity %> } from "../../entities";
import { <%= config.commandName %> } from "../impl";

@CommandHandler(<%= config.commandName %>)
export class <%= config.commandName %>Handler implements ICommandHandler<<%= config.commandName %>> {
  constructor(
    @InjectRepository(<%= config.names.entity %>) private readonly repository: Repository<<%= config.names.entity %>>,
  ) {}

  @Transactional()
  async execute({ dto }: <%= config.commandName %>): Promise<<%= config.names.entity %>> {
    Logger.log(cyanBright("Async <%= config.commandName %>Handler...", "<%= config.commandName %>"));
  }
}
