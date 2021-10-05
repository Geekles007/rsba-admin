import React, {memo} from "react";
import {useQuery} from "@apollo/client";
import {InlineLoading} from "carbon-components-react";
import HeadTitle from "../../common/HeadTitle";
import TypeListScroller from "../list-scroller";
import {GET_TYPES} from "../../services/queries/type";
import {IType} from "../../models/IType";
import {RETRIEVES_COUNT} from "../../constants";
import {IConnection} from "../../models/IConnection";
import HeaderPanel from "../../common/header-panel";
import ModalUI from "../../common/modal-module";
import {ioClient} from "../../services/client";
import TypeStore from "../../stores/TypeStore";

interface TypeModuleProps {
    token: string;
    searchLoading: boolean;
    searchResults?: IConnection<IType>,
    inputSearch: string,
    searchMore: any;
    searchInput: JSX.Element;
}

const ParentTypeList = ({token, inputSearch, searchLoading, searchResults, searchMore, searchInput}: TypeModuleProps) => {

    const tokenContext = {
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    const {loading, data, fetchMore, refetch} = useQuery<IConnection<IType>, {first: number, after?: string}>(GET_TYPES, {
        client: ioClient,
        variables: {
            first: RETRIEVES_COUNT
        },
        ...tokenContext
    });

    if (loading || loading) return <InlineLoading description={("Загрузка...")}/>;
    if (!data || (!searchResults && inputSearch !== "")) return <h4>Что-то пошло не так, вы можете обновить или связаться с вашим провайдером</h4>;

    const retriever = ((searchResults && inputSearch !== "") ? searchResults?.searchOrderType : data?.retrieveAllOrderType);
    const income = (retriever ? retriever : data?.retrieveAllOrderType)?.edges.map(item => item.node) ?? [];

    return (
        <>
            <HeaderPanel content={<HeadTitle title={"Типы заказов"} />}>
                <TypeListScroller
                    refetch={refetch}
                    searchInput={searchInput}
                    fetchMore={(searchResults && inputSearch !== "") ? searchMore : fetchMore}
                    data={income}
                    retrieveAttributes={(searchResults && inputSearch !== "") ? "searchOrderType" : "retrieveAllOrderType"}
                    count={RETRIEVES_COUNT} />
            </HeaderPanel>
            <ModalUI />
        </>
    );

}

export default memo(ParentTypeList);