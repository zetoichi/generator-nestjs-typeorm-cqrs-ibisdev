import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { cyanBright } from "cli-color";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional";

import { <%= config.names.entity %> } from "../../entities";
import { <%= config.queryName %> } from "../impl";

@QueryHandler(<%= config.queryName %>)
export class <%= config.queryName %>Handler implements IQueryHandler<<%= config.queryName %>> {
  constructor(
    @InjectRepository(<%= config.names.entity %>) private readonly repository: Repository<<%= config.names.entity %>>,
  ) {}

  @Transactional()
  async execute({ dto }: <%= config.queryName %>): Promise<<%= config.names.entity %>> {
    Logger.log(cyanBright("Async <%= config.queryName %>Handler...", "<%= config.queryName %>"));
  }
}
