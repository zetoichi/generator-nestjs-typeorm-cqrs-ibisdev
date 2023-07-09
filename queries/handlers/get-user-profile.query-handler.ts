import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { cyanBright } from "cli-color";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional";

import { UserProfile } from "../../entities";
import { GetUserProfileQuery } from "../impl";

@QueryHandler(GetUserProfileQuery)
export class GetUserProfileQueryHandler implements IQueryHandler<GetUserProfileQuery> {
  constructor(
    @InjectRepository(UserProfile) private readonly repository: Repository<UserProfile>,
  ) {}

  @Transactional()
  async execute({ dto }: GetUserProfileQuery): Promise<UserProfile> {
    Logger.log(cyanBright("Async GetUserProfileQueryHandler...", "GetUserProfileQuery"));
  }
}
