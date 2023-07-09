import { <%= config.names.dto %> } from "../dto";

export class <%= config.commandName %> {
  constructor(public readonly dto: <%= config.names.dto %>) { }
}
