import React, {memo, useCallback, useState} from "react";
import ArticleListModule from "../article-list-module";
import {Breadcrumb, BreadcrumbItem, Column, Grid, Row, Search} from "carbon-components-react";
import {debounce} from "lodash";
import {RETRIEVES_COUNT} from "../../../constants";
import {useLazyQuery} from "@apollo/client";
import {IConnection} from "../../../models/IConnection";
import {IArticle} from "../../models/IArticle";
import {SEARCH_ARTICLES} from "../../services/queries/article";
import styled from "styled-components";
import ArticleStore from "../../stores/ArticleStore";
import PreviewHandler from "../preview-handler";
import DDSBreadcrumb from "@carbon/ibmdotcom-web-components/es/components-react/leadspace/breadcrumb";
import DDSBreadcrumbItem from "@carbon/ibmdotcom-web-components/es/components-react/leadspace/breadcrumb-item";
import {Home32} from "@carbon/icons-react";
import {observer} from "mobx-react";
import ModalUI from "../../../common/modal-module";

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