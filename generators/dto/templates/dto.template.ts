import { MapperOmitType } from "@automapper/classes/mapped-types";

import { <%= config.names.entity %> } from "../entities";

export class <%= config.names.dto %> extends MapperOmitType(<%= config.names.entity %>, ["id"]) {}
