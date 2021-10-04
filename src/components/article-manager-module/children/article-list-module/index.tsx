import {memo, useEffect} from "react";
import {useQuery} from "@apollo/client";
import {GET_ARTICLES} from "../../services/queries/article";
import {ioClient} from "../../services/client";
import {RETRIEVES_COUNT} from "../../constants";
import ListScroller from "./children/list-scroller";
import {InlineLoading} from "carbon-components-react";
import {IConnection} from "../../models/IConnection";
import {IArticle} from "../../models/IArticle";
import styled from "styled-components";

interface ArticleListModuleProps {
    token: string;
    setRendered: (state: boolean) => void;
    searchLoading: boolean;
    searchResults?: IConnection<IArticle>,
    inputSearch: string,
    searchMore: any
}

const ArticleListModule = ({token, setRendered, inputSearch, searchLoading, searchResults, searchMore}: ArticleListModuleProps) => {

    const tokenContext = {
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    const {loading, data, fetchMore, refetch} = useQuery<IConnection<IArticle>, {first: number, after?: string}>(GET_ARTICLES, {
        client: ioClient,
        variables: {
            first: RETRIEVES_COUNT
        },
        ...tokenContext
    })

    useEffect(() => {
        return function cleanUp() {
            setRendered(false);
        }
    }, []);

    if (loading || searchLoading) return <InlineLoading description={("Загрузка...")}/>;
    if (!data || (!searchResults && inputSearch !== "")) return <h4>Что-то пошло не так, вы можете обновить или связаться с вашим провайдером</h4>;

    const retriever = ((searchResults && inputSearch !== "") ? searchResults?.searchFeedbackArticle : data?.retrieveAllFeedbackArticle);
    const income = (retriever ? retriever : data?.retrieveAllFeedbackArticle)?.edges.map(item => item.node) ?? [];

    return (
        <>
            <ListScroller
                fetchMore={(searchResults && inputSearch !== "") ? searchMore : fetchMore}
                data={income}
                retrieveAttributes={(searchResults && inputSearch !== "") ? "searchFeedbackArticle" : "retrieveAllFeedbackArticle"}
                count={RETRIEVES_COUNT} />
        </>
    );

}

export default memo(ArticleListModule);