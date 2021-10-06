import React, {memo} from "react";
import {useQuery} from "@apollo/client";
import {InlineLoading} from "carbon-components-react";
import TypeListScroller from "../list-scroller";
import {GET_TYPES} from "../../services/queries/type";
import {IType} from "../../models/IType";
import {RETRIEVES_COUNT} from "../../constants";
import {IConnection} from "../../models/IConnection";
import {ioClient} from "../../services/client";

interface TypeModuleProps {
    token: string;
    searchLoading: boolean;
    searchResults?: IConnection<IType>,
    inputSearch?: string,
    searchMore: any;
    data: any,
    searchRefresh: any
}

const ParentTypeList = ({
                            token,
                            inputSearch,
                            searchLoading,
                            searchRefresh,
                            data,
                            searchResults,
                            searchMore
                        }: TypeModuleProps) => {

    if (searchLoading) return <InlineLoading description={("Загрузка...")}/>;
    if (!data) return <h4>Что-то пошло не так, вы можете обновить или
        связаться с вашим провайдером</h4>;

    const retriever = ((searchResults && inputSearch !== "" && inputSearch) ? searchResults?.searchOrderType : data?.retrieveAllOrderType);

    const income = (retriever ? retriever : data?.retrieveAllOrderType)?.edges.map((item: any) => item.node) ?? [];

    return (
        <>
            <TypeListScroller
                refetch={searchRefresh}
                fetchMore={searchMore}
                data={income}
                retrieveAttributes={(searchResults && inputSearch !== "") ? "searchOrderType" : "retrieveAllOrderType"}
                count={RETRIEVES_COUNT}/>
        </>
    );

}

export default memo(ParentTypeList);