import { INames } from "./names.interface";
export interface IConf {
    names?: INames;
    action?: string;
    commandName?: string;
    queryName?: string;
    eventName?: string;
    handlerName?: string;
}
