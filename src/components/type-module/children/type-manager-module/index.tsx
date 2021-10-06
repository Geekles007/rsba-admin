import React, {useCallback, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {Search} from "carbon-components-react";
import {debounce} from "lodash";
import styled from "styled-components";
import ParentTypeList from "../parent-type-list";
import {GET_TYPES, SEARCH_TYPE_OF_ORDER} from "../../services/queries/type";
import {IType} from "../../models/IType";
import {IConnection} from "../../models/IConnection";
import {RETRIEVES_COUNT} from "../../constants";
import ToolbarContentUI from "../../common/datatable/components/toolbar/components/toolbar-content";
import DialogStore from "../../stores/DialogStore";
import GenericFormUI from "../../common/generic-form";
import TypeModuleController from "../../controller";
import {observer} from "mobx-react";
import TypeStore from "../../stores/TypeStore";

interface TypeManagerModuleProps {
    token: string;
}

const Wrapping = styled.div`

  .searching {
    margin-top: 3em;
    margin-bottom: 1em;
  }
`;

const TypeManagerModule = ({token}: TypeManagerModuleProps) => {

    const tokenContext = {
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    const [input, setInput] = useState<string | undefined>();
    const [executeSearch, {data, fetchMore, loading, refetch}] = useLazyQuery<IConnection<IType>>(
        input && input !== "" ? SEARCH_TYPE_OF_ORDER : GET_TYPES
    );

    useEffect(() => {
        if(!input || input === "") {
            executeSearch({
                variables: {first: RETRIEVES_COUNT},
                ...tokenContext
            })
        }
    }, []);

    const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event?.target?.value;
        setInput(value);
        handleFilter(value);
    }, [input])

    const handleFilter = debounce((val) => {
        if (val && val.length > 0) {
            executeSearch({
                variables: {input: val, first: RETRIEVES_COUNT},
                ...tokenContext
            })
        }
    }, 300);

    const add = () => {
        DialogStore.openFromOutside({
            title: 'fill-and-save',
            content: <GenericFormUI {...TypeModuleController.getOptions()} />,
            size: 'sm'
        });
    }

    return (
        <Wrapping>
            <ToolbarContentUI
                titleNew="Добавить новый"
                data={TypeStore.values}
                searchInput={<Search
                    labelText={""}
                    id="search-1"
                    placeHolderText="Тип поиска"
                    onChange={onChangeHandler}
                />}
                add={add}
                refresh={refetch} />
            <ParentTypeList data={data} searchLoading={loading} searchRefresh={refetch} inputSearch={input} searchMore={fetchMore}
                        searchResults={data} token={token}/>
        </Wrapping>
    );

}

export default observer(TypeManagerModule);