import {memo} from "react";
import {IType} from "../../models/IType";
import DatatableUI, {DatatableProps} from "../../common/datatable";
import * as _ from "lodash";
import TypeModuleController from "./../../controller";
import TypeStore from "../../stores/TypeStore";
import GenericFormUI from "../../common/generic-form";
import DialogStore from "../../stores/DialogStore";

interface TypeListHandlerProps {
    refresher: string;
    data: IType[],
    searchInput: JSX.Element;
    refresh?: () => void;
}

const TypeListHandler = ({refresher, searchInput, data, refresh}: TypeListHandlerProps) => {

    TypeStore.setListFromArray(data);

    const add = () => {
        DialogStore.openFromOutside({
            title: 'fill-and-save',
            content: <GenericFormUI {...TypeModuleController.getOptions()} />,
            size: 'sm'
        });
    }

    const tableOptions: DatatableProps<any> = {
        data: TypeModuleController.getCustomData(_.orderBy(data, ['createdAt'],['desc'])),
        headers: TypeModuleController.headers,
        add: add,
        titleNew: "Добавить новый",
        actions: TypeModuleController.actions,
        paginatorChange: TypeModuleController.paginatorChange,
        noPaginator: true,
        noSelection: false,
        refresh: refresh,
        searchInput: searchInput,
        batchActions: TypeModuleController.batchActions
    }

    return (
        <>
            <DatatableUI {...tableOptions} />
        </>
    );

}

export default memo(TypeListHandler);