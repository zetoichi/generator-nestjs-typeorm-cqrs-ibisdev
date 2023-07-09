import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { MapInterceptor } from "@automapper/nestjs";

import { ENTITY_NAMES, PATHS, TAGS } from "@/common/constants";
import { GuardedController } from "@/common/base";
import {
  CreateAction,
  EntityName,
  PublicCreateAction,
  ReadAction,
  UpdateAction,
  CurrentUser,
} from "@/common/decorators/controller";
import { PaginationService, PaginationType } from "@/common/providers/pagination";
import { PageDto } from "@/common/base/dto/page.dto";
import { AutoMapperService } from "@/common/providers/automapper";

import { JwtPayload } from "../auth/interfaces";
import { <%= config.names.entity %> } from "../entities";
import { 
  <%= config.names.dto %>,
  <%= config.names.createDto %>,
  <%= config.names.updateDto %>,
  <%= config.names.pageOptionsDto %>,
} from "../dto";
import { 
  <%= config.names.createCommand %>,
  <%= config.names.updateCommand %>,
} from "../commands";
import { 
  <%= config.names.getOneQuery %>,
  <%= config.names.getManyQuery %>,
  <%= config.names.getMineQuery %>,
} from "../queries";

@ApiTags()
@EntityName()
@Controller()
export class <%= config.names.controller %> extends GuardedController {
  constructor(
    private readonly paginationService: PaginationService,
    private readonly automapperService: AutoMapperService,  
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {
    super();
  }


  @CreateAction()
  @Post()
  @UseInterceptors(MapInterceptor(<%= config.names.entity %>, <%= config.names.dto %>))
  async create(@Body() dto: Create<%= config.names.dto %>): Promise<<%= config.names.dto %>> {
    return await this.commandBus.execute(new <%= config.names.createCommand %>(<%= config.names.dto %>));
  }

  @UpdateAction()
  @Put(PATHS.ONE)
  @UseInterceptors(MapInterceptor(<%= config.names.entity %>, <%= config.names.dto %>))
  async update(
    @Param("uuid") uuid: string,
    @Body() dto: Update<%= config.names.dto %>,
  ): Promise<<%= config.names.dto %>> {
    return await this.commandBus.execute(new <%= config.names.updateCommand %>(<%= config.names.dto %>));
  }

  @ReadAction()
  @Get()
  async getMany(
    @Query() pageOptions: <%= config.names.pageOptionsDto %>,
  ): Promise<PageDto<<%= config.names.dto %>>> {
    const [entities, pageMetaDto] = await this.queryBus
      .execute<<%= config.names.getManyQuery %>, PaginationType<<%= config.names.entity %>>>(
        new <%= config.names.getManyQuery %>(pageOptions)
      );

    const dto = this.automapperService.mapper.mapArray(
      entities,
      <%= config.names.entity %>,
      <%= config.names.dto %>,
    );

    return this.paginationService.toPaginationDto(dto, pageMetaDto);
  }

  @ReadAction()
  @Get(PATHS.MINE)
  async getMine(
    @CurrentUser() { sub }: JwtPayload,
    @Query() pageOptions: <%= config.names.pageOptionsDto %>,
  ): Promise<PageDto<<%= config.names.dto %>>> {
    const [entities, pageMetaDto] = await this.queryBus.execute(
      new <%= config.names.getMineQuery %>(sub, pageOptions),
    );

    const dto = this.automapperService.mapper.mapArray(
      entities,
      <%= config.names.entity %>,
      <%= config.names.dto %>,
    );

    return this.paginationService.toPaginationDto(dto, pageMetaDto);
  }

  @ReadAction()
  @Get(PATHS.ONE)
  @UseInterceptors(MapInterceptor(<%= config.names.entity %>, <%= config.names.dto %>))
  async getOne(@Param("uuid") uuid: string): Promise<<%= config.names.dto %>> {
    return await this.queryBus.execute(new <%= config.names.getOneQuery %>({ uuid }));
  }
}
