import {GraphQLError} from "graphql";

class ApolloErrorInterceptor {
    public message: string[] = [];

    constructor(public readonly errors?: ReadonlyArray<GraphQLError>) {
        console.log("ApolloErrorInterceptor >>>", errors);
        if ((errors?.length ?? 0) > 0) {
            errors!!.forEach(({message}) => {
                const show = message?.split(']')?.pop() ?? '';
                this.message.push(show ?? message)
            });
        }
    }
}

export default ApolloErrorInterceptor;