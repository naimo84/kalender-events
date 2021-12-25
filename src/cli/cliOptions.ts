import { Config } from "../";

export interface CliOptions extends Config {
    argument?: any;
    basicAuth?:string
}