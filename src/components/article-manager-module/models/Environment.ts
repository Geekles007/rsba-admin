import { IBase } from "./IBase";

const Debug: IBase = {
    URI_FOR_FAQ: "http://46.101.125.169:9005/graphql"
}

const Production: IBase = {
    URI_FOR_FAQ: "http://46.101.125.169:9005/graphql"
}

const USAGE = Debug;

export {
    Debug,
    Production,
    USAGE
}
