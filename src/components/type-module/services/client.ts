import {ApolloLink, concat, HttpLink} from '@apollo/client';
import {ApolloClient, DefaultOptions, InMemoryCache} from "@apollo/react-hooks";
import {ACCESS_TOKEN, CONNECTED_INSTANCE} from "../constants";
import i18next from "i18next";
import {USAGE} from "../models/Environment";

class ClientBuilder {

    httpLink!: any;
    connected: any;
    authMiddleware!: ApolloLink;

    constructor(client: string) {
        this.httpLink = new HttpLink({ uri: client });
        if(localStorage.getItem(CONNECTED_INSTANCE)) {
            this.connected = localStorage.getItem(CONNECTED_INSTANCE);
        }
        this.authMiddleware = new ApolloLink((operation, forward) => {
            // add the authorization to the headers
            operation.setContext({
                headers: {
                    "X-Lang": i18next.language,
                    "X-Lat": "0",
                    "X-Long": "0",
                    Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) ?? null,
                }
            });
            if(this.connected && this.connected.expireIn < Date.now()) {
                localStorage.clear();
            }
            return forward(operation);
        })
    }

    get getClient() {
        return new ApolloClient({
            name: 'RSBASystem',
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                    errorPolicy: 'ignore',
                },
                query: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all',
                },
            },
            link: concat(this.authMiddleware, this.httpLink),
        });
    }

}

export default ClientBuilder;

export const ioClient = new ClientBuilder(USAGE.URI_FOR_ORDER).getClient