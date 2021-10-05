import React, {memo, useCallback, useState} from "react";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {InlineLoading, Search} from "carbon-components-react";
import {debounce} from "lodash";
import styled from "styled-components";
import ParentTypeList from "../parent-type-list";
import {SEARCH_TYPE_OF_ORDER} from "../../services/queries/type";
import {IType} from "../../models/IType";
import {IConnection} from "../../models/IConnection";
import {RETRIEVES_COUNT} from "../../constants";
import {UPLOAD_FILE} from "../../services/mutations/type";
import ClientBuilder from "../../services/client";
import {USAGE} from "../../models/Environment";

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

    const [input, setInput] = useState<string>("");
    const [executeSearch, {data, fetchMore, loading}] = useLazyQuery<IConnection<IType>>(
        SEARCH_TYPE_OF_ORDER
    );

    const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event?.target?.value;
        console.log(value);
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
            <ParentTypeList searchInput={
                <Search
                    labelText={""}
                    id="search-1"
                    placeHolderText="Тип поиска"
                    onChange={onChangeHandler}
                />
            } searchLoading={loading} inputSearch={input} searchMore={fetchMore}
                        searchResults={data} token={token}/>
        </Wrapping>
    );

}

export default memo(TypeManagerModule);