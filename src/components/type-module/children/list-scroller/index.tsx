import React, {memo} from "react";
import useInfiniteScroll from "../../common/use-infinite-scroll";
import {IType} from "../../models/IType";
import TypeListHandler from "../type-list-handler";
import ListInfiniteScroll from "../../common/ListInfiniteScroll";

interface ListWrapperProps {
    fetchMore: any;
    retrieveAttributes: any;
    count: number;
    data: Array<IType>;
    searchInput: JSX.Element;
    refetch: any;
}

const TypeListScroller = ({fetchMore, retrieveAttributes, count, data, searchInput, refetch}: ListWrapperProps) => {

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
            <TypeListHandler refresh={refetch} searchInput={searchInput} refresher={refresher} data={income} />
        </ListInfiniteScroll>
    );

}

export default memo<ListWrapperProps>(TypeListScroller);