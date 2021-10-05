import React, {memo} from "react";
import {IArticle} from "../../../../models/IArticle";
import ArticleList from "../article-list";
import useInfiniteScroll from "../../../../common/use-infinite-scroll";
import ListInfiniteScroll from "../../../../common/ListInfiniteScroll";

interface ListWrapperProps {
    fetchMore: any;
    retrieveAttributes: any;
    count: number;
    data: Array<IArticle>;
}

const ListScroller = ({fetchMore, retrieveAttributes, count, data}: ListWrapperProps) => {

    const {
        hasMore,
        loading,
        loadMore,
        refresher,
        income
    } = useInfiniteScroll({
        fetchMore: fetchMore,
        retrieveAttributes: retrieveAttributes,
        count: count,
        data: data
    });

    return (
        <ListInfiniteScroll hasMoreData={hasMore}
                        isLoading={loading}
                        onBottomHit={loadMore}
                        loadOnMount={false}>
            <ArticleList refresher={refresher} data={income} />
        </ListInfiniteScroll>
    );

}

export default memo(ListScroller);