import pluralize from "pluralize";
import {
  kebabToPascal,
  kebabToCamel,
  kebabToSnake,
  forceKebab
} from "./case-change";
import { INames } from "../common";

export const cleanName = (str: string) =>
  str.endsWith("s") ? str.substr(0, str.length - 1) : str;

export const getNames = (name: string): INames => {
  const kebab = forceKebab(name);
  const pascal = kebabToPascal(kebab);
  const camel = kebabToCamel(kebab);
  const snake = kebabToSnake(kebab);
  const entity = pascalToEntityName(pascal);
  const dto = pascalToDtoName(pascal);
  const createDto = pascalToCreateDtoName(pascal);
  const updateDto = pascalToUpdateDtoName(pascal);
  const pageOptionsDto = pascalToPageOptionsDtoName(pascal);
  const iface = pascalToInterfaceName(pascal);
  const controller = pascalToControllerName(pascal);
  const createCommand = pascalToCreateCommandName(pascal);
  const updateCommand = pascalToUpdateCommandName(pascal);
  const getOneQuery = pascalToGetOneQueryName(pascal);
  const getManyQuery = pascalToGetManyQueryName(pascal);
  const getMineQuery = pascalToGetMineQueryName(pascal);
  const createCommandHandler = makeHandlerName(createCommand);
  const updateCommandHandler = makeHandlerName(updateCommand);
  const getOneQueryHandler = makeHandlerName(getOneQuery);
  const getManyQueryHandler = makeHandlerName(getManyQuery);
  const getMineQueryHandler = makeHandlerName(getMineQuery);

  return {
    kebab,
    pascal,
    camel,
    snake,
    entity,
    dto,
    createDto,
    updateDto,
    pageOptionsDto,
    iface,
    controller,
    createCommand,
    updateCommand,
    getOneQuery,
    getManyQuery,
    getMineQuery,
    createCommandHandler,
    updateCommandHandler,
    getOneQueryHandler,
    getManyQueryHandler,
    getMineQueryHandler
  };
};

const pascalToEntityName = (pascal: string) => pascal;

const pascalToDtoName = (pascal: string) => `${pascal}Dto`;

const pascalToCreateDtoName = (pascal: string) => `Create${pascal}Dto`;

const pascalToUpdateDtoName = (pascal: string) => `Update${pascal}Dto`;

const pascalToPageOptionsDtoName = (pascal: string) =>
  `${pascal}PageOptionsDto`;

const pascalToInterfaceName = (pascal: string) => `I${pascal}`;

const pascalToControllerName = (pascal: string) => `${pascal}Controller`;

const pascalToCreateCommandName = (pascal: string) => `Create${pascal}Command`;

const pascalToUpdateCommandName = (pascal: string) => `Update${pascal}Command`;

const pascalToGetOneQueryName = (pascal: string) => `Get${pascal}Query`;

const pascalToGetManyQueryName = (pascal: string) =>
  `Get${pluralize(pascal)}Query`;

const pascalToGetMineQueryName = (pascal: string) =>
  `Get${pluralize(pascal)}ByProfileIdQuery`;

const makeHandlerName = (pascal: string) => `${pascal}Handler`;
