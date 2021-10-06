import React, {memo} from "react";
import {observer, Provider} from "mobx-react";
import TypeManagerModule from "./children/type-manager-module";
import DialogStore from "./stores/DialogStore";
import {ApolloProvider} from "@apollo/client";
import ClientBuilder from "./services/client";
import {USAGE} from "./models/Environment";
import "./../../config";
import ModalUI from "./common/modal-module";
import HeadTitle from "./common/HeadTitle";
import HeaderPanel from "./common/header-panel";

interface ParentArticleListProps {
    token: string;
}

const TypeModule = ({token}: ParentArticleListProps) => {
    const Client = new ClientBuilder(USAGE.URI_FOR_ORDER);

    return (
        <>
            <ApolloProvider client={Client.getClient}>
                <Provider DialogStore={DialogStore}>
                    <HeaderPanel content={<HeadTitle title={"Типы заказов"} />}>
                        <TypeManagerModule token={token} />
                    </HeaderPanel>
                    <ModalUI />
                </Provider>
            </ApolloProvider>
        </>
    );

}

export default memo(TypeModule);