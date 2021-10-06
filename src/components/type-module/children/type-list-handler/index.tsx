import React, {memo, useEffect} from "react";
import {IType} from "../../models/IType";
import DatatableUI, {DatatableProps} from "../../common/datatable";
import * as _ from "lodash";
import TypeModuleController from "./../../controller";
import TypeStore from "../../stores/TypeStore";

interface TypeListHandlerProps {
    refresher: string;
    data: IType[],
    refresh?: () => void;
}

const TypeListHandler = ({refresher, data, refresh}: TypeListHandlerProps) => {

    useEffect(() => {
        TypeStore.setListFromArray(data);
    }, [])

    const tableOptions: DatatableProps<any> = {

        data: TypeModuleController.getCustomData(_.orderBy(data, ['createdAt'],['desc'])),
        headers: TypeModuleController.headers,
        titleNew: "Добавить новый",
        actions: TypeModuleController.actions,
        paginatorChange: TypeModuleController.paginatorChange,
        noPaginator: true,
        noSelection: false,
        noToolbar: true,
        refresh: refresh,
        batchActions: TypeModuleController.batchActions
    }

    return (
        <>
            <DatatableUI key={refresher} {...tableOptions} />
        </>
    );

}

export default memo(TypeListHandler);