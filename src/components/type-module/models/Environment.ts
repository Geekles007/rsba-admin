import { IBase } from "./IBase";

const Debug: IBase = {
    URI_FOR_FAQ: "http://46.101.125.169:9005/graphql",
    URI_FOR_ORDER: "http://207.154.242.175:9004/graphql",
    URI_FOR_USER: "http://165.227.131.116:9001/graphql",
}

const Production: IBase = {
    URI_FOR_FAQ: "http://46.101.125.169:9005/graphql",
    URI_FOR_ORDER: "http://207.154.242.175:9004/graphql",
    URI_FOR_USER: "http://165.227.131.116:9001/graphql",
}

const USAGE = Debug;

export {
    Debug,
    Production,
    USAGE
}
