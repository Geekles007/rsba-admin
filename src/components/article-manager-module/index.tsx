import {useState} from "react";
import * as React from "react";
import {ApolloProvider} from "@apollo/client";
import {ioClient} from "./services/client";
import {Tab, Tabs} from "carbon-components-react";
import MakeArticleModule from "./children/make-article-module";
import ParentArticleList from "./children/parent-article-list";
import ArticleStore from "./stores/ArticleStore";
import {observer, Provider} from "mobx-react";
import ModalUI from "../common/modal-module";
import DialogStore from "../stores/DialogStore";

interface ArticleManagerModuleProps {
    token: string;
}

const ArticleManagerModule = ({token}: ArticleManagerModuleProps) => {

    const [rendered, setRendered] = useState<boolean>(false);

    return (
        <ApolloProvider client={ioClient}>
            <Provider DialogStore={DialogStore}>
                <Tabs selected={ArticleStore.selected}>
                    <Tab label={"Составить статью"} onClick={() => setRendered(false)} renderContent={() => (
                        (!rendered) ? <MakeArticleModule token={token} /> : <></>
                    )} />
                    <Tab label={"Список статей"} onClick={() => setRendered(true)} renderContent={() => ((rendered) ?
                        <ParentArticleList token={token} setRendered={setRendered} /> : <></>)} />
                </Tabs>
                <ModalUI/>
            </Provider>
        </ApolloProvider>
    );

}

export default observer(ArticleManagerModule);