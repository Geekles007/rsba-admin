import React, {memo, useCallback, useState} from "react";
import ArticleListModule from "../article-list-module";
import {Column, Grid, Row, Search} from "carbon-components-react";
import {debounce} from "lodash";
import {useLazyQuery} from "@apollo/client";
import styled from "styled-components";
import {observer} from "mobx-react";
import {SEARCH_ARTICLES} from "../../services/queries/article";
import {IArticle} from "../../models/IArticle";
import {RETRIEVES_COUNT} from "../../constants";
import {IConnection} from "../../models/IConnection";

interface ParentArticleListProps {
    token: string;
    setRendered: (state: boolean) => void;
}

const Wrapping = styled.div`

  .searching {
    margin-top: 3em;
    margin-bottom: 1em;
  }
`;

const ParentArticleList = ({token, setRendered}: ParentArticleListProps) => {

    const tokenContext = {
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    const [input, setInput] = useState<string>("");
    const [executeSearch, {data, fetchMore, loading}] = useLazyQuery<IConnection<IArticle>>(
        SEARCH_ARTICLES
    );

    const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event?.target?.value;
        setInput(value);
        handleFilter(value);
    }, [input])

    const handleFilter = debounce((val) => {
        if (val.length > 0) {
            executeSearch({
                variables: {input: val, first: RETRIEVES_COUNT},
                ...tokenContext
            })
        }
    }, 300);

    return (
        <Wrapping>
            <Grid>
                <Row condensed>
                    <Column lg={12}>
                        <div className="searching">
                            <Search
                                labelText={""}
                                id="search-1"
                                placeHolderText="Поиск статьи"
                                onChange={onChangeHandler}
                            />
                        </div>
                    </Column>
                </Row>
            </Grid>
            <ArticleListModule searchLoading={loading} inputSearch={input} searchMore={fetchMore}
                               searchResults={data} setRendered={setRendered} token={token}/>
        </Wrapping>
    );

}

export default observer(ParentArticleList);