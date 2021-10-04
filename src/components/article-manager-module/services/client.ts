import {HttpLink} from '@apollo/client';
import {ApolloClient, DefaultOptions, InMemoryCache} from "@apollo/react-hooks";
import {setContext} from '@apollo/client/link/context';
import {USAGE} from "../../models/Environment";

export const httpUserLink = new HttpLink({
    uri: USAGE.URI_FOR_FAQ
});

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

const authLink = setContext((_, {headers}) => {
    return {headers: {...headers,}};
});

const ioClient = new ApolloClient({
    link: authLink.concat(httpUserLink),
    defaultOptions: defaultOptions,
    cache: new InMemoryCache()
});

export {ioClient}
