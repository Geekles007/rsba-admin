import {memo} from "react";
import * as React from "react";
import {ApolloProvider} from "@apollo/client";
import {ioClient} from "./services/client";
import {Tab, Tabs} from "carbon-components-react";

interface ArticleManagerModuleProps {
    token: string;
}

const ArticleManagerModule = ({token}: ArticleManagerModuleProps) => {

    return (
        <>
            <ApolloProvider client={ioClient}>
                <Tabs>
                    <Tab label={"Составить статью"}>

                    </Tab>
                    <Tab label={"Список статей"}>

                    </Tab>
                </Tabs>
            </ApolloProvider>
        </>
    );

}

export default memo(ArticleManagerModule);