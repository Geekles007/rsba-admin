import {IType} from "../models/IType";
import {DenormalizedRow, Tag} from "carbon-components-react";
import * as yup from "yup"
import {CREATE_EDIT_TYPE_OF_ORDER, DELETE_TYPE_OF_ORDER} from "../services/mutations/type";
import {GET_TYPES} from "../services/queries/type";
import {v4 as uuidv4} from "uuid";
import { TYPEINPUT } from "../common/generic-form/constants";
import { RETRIEVES_COUNT } from "../constants";
import GenericFormUI, { GenericFormUIProps } from "../common/generic-form";
import {CheckmarkFilled20, Delete24} from "@carbon/icons-react";
import {CustomProps} from "../common/custom-options-menu";
import { GenericDeleteProps } from "../common/generic-delete";
import DialogStore from "../stores/DialogStore";
import GenericDelete from "./../common/generic-delete";
import {ioClient} from "../services/client";
import TypeStore from "./../stores/TypeStore";
import {green60} from "@carbon/colors";

class TypeModuleController {

    headers: any[] = [
        {
            header: "name-text",
            key: "name"
        },
        {
            header: "description-text",
            key: "description"
        },
        {
            header: "Default",
            key: "isDefault"
        },
    ];

    private readonly CREATE_TECHNOLOGY_FIELDS = {
        name: "name",
        description: "description",
        isDefault: "isDefault",
    };

    get fields() {
        return this.CREATE_TECHNOLOGY_FIELDS;
    }

    get MySchema() {
        return yup.object().shape({
            name: yup.string().required(),
            description: yup.string()
        });
    }

    getCustomData(data: IType[]) {
        return data.map((item: IType) => {
            return {
                id: item?.id,
                name: item?.name,
                description: item?.description,
                isDefault: item.isDefault ? <CheckmarkFilled20 color={green60} /> : <></>
            }
        })
    }

    getOptions(dataToEdit?: IType): GenericFormUIProps<IType> {
        return {
            dataToEdit: dataToEdit,
            schema: this.MySchema,
            formOptions: {
                node: CREATE_EDIT_TYPE_OF_ORDER,
                variables: {
                    client: ioClient,
                    refetchQueries: [
                        {
                            query: GET_TYPES,
                            variables: {first: RETRIEVES_COUNT, after: null}
                        }
                    ]
                },
                inputs: [
                    {
                        type: TYPEINPUT.text,
                        helperText: "",
                        id: uuidv4(),
                        defaultValue: dataToEdit?.name,
                        name: this.fields.name ?? "",
                        invalidText: 'invalid-name-field-text',
                        labelText: 'name-field-text',
                        placeholder: 'name-field-placeholder',
                        invalid: "name"
                    },
                    {
                        type: TYPEINPUT.textarea,
                        helperText: "",
                        id: uuidv4(),
                        defaultValue: dataToEdit?.description,
                        name: this.fields.description ?? "",
                        labelText: 'description-text',
                        placeholder: 'description-placeholder-text'
                    },
                    {
                        type: TYPEINPUT.checkbox,
                        helperText: "",
                        id: uuidv4(),
                        defaultValue: dataToEdit?.isDefault,
                        name: (this.fields.isDefault as string) ?? "",
                        invalidText: 'invalid-operations-field-text',
                        labelText: 'is-default-field-text',
                        placeholder: 'is-default-field-placeholder',
                        invalid: "isDefault",
                    },
                ]
            }
        }
    }

    actions: CustomProps[] = [
        {
            permission: "",
            options: {
                itemText: "Edit "
            },
            text: "edit-action",
            func: (row: any) => {
                // @ts-ignore
                const data: any = TypeStore.list.get(row?.id);
                console.log(data);
                DialogStore.openFromOutside({
                    title: 'fill-and-save',
                    content: <GenericFormUI {...this.getOptions(data)} />,
                    size: 'sm'
                })
            }
        }
    ];

    batchActions = [
        {
            title: "delete-action",
            func: (selectedItems: readonly DenormalizedRow[]) => {
                const options: GenericDeleteProps<DenormalizedRow> = {
                    text: "delete-item-text",
                    list: selectedItems.filter((item: DenormalizedRow) => ({id: item.id})),
                    operation: {
                        node: DELETE_TYPE_OF_ORDER,
                        variables: {
                            client: ioClient,
                            refetchQueries: [
                                {
                                    query: GET_TYPES,
                                    variables: {first: RETRIEVES_COUNT, after: null}
                                }
                            ]
                        }
                    }
                }
                DialogStore.openFromOutside({
                    title: 'delete-action',
                    content: <GenericDelete {...options} />,
                    size: 'xs'
                })
            },
            icon: Delete24
        }
    ];

    paginatorChange() {}

}

export default new TypeModuleController();