import {memo, useEffect, useState} from "react";
import * as React from "react"
import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {BaseMutationOptions, useMutation} from "@apollo/client";
import {DocumentNode} from "graphql";
import GenericFormController from './controller';
import {GenericFormProps} from "../../model/GenericFormProps";
import {Form, ModalBody, ModalFooter} from "carbon-components-react";
import {InputProps} from "../../model/InputProps";
import InputBuilder from "../input-builder";
import RequestAlert from "../../../request-alert";
import {BaseProps} from "../../model/BaseProps";
import ModalActionsUI from "../../../modal-actions";
import {ISuccess} from "../../../../models/ISuccess";
import DialogStore from "../../../../stores/DialogStore";
import ApolloErrorInterceptor from "../../../../services/ApolloErrorInterceptor";

export interface FormGeneratorProps<T extends BaseProps> {
    node: DocumentNode,
    variables: BaseMutationOptions,
    dataToEdit?: T,
    pretendId?: string,
    additionals?: {
        [key: string]: any
    },
    useForm?: GenericFormProps,
    inputs: InputProps<T>[],
    description?: string;
    refetch?: () => void;
}

const FormGenerator = <V extends BaseProps>({
                                                node,
                                                variables,
                                                additionals,
                                                pretendId,
                                                dataToEdit,
                                                useForm,
                                                inputs,
                                                description
                                            }: FormGeneratorProps<V>) => {
    const [formData, setFormData] = useState<V | null>(dataToEdit ?? null)
    const {t} = useTranslation('translation', {useSuspense: false});
    const [succeed, setSucceed] = React.useState<ISuccess>({message: "operation-succeed"});
    const [action, {loading, error}] = useMutation(node, {
        ...variables
    });
    const ctrl = new GenericFormController<V>();

    useEffect(() => {
        return function cleanup() {
            useForm?.reset();
            DialogStore.clear();
        }
    }, []);

    const onSubmit = (data: Partial<BaseProps>,) => {
        if (formData?.id !== "") {
            data = {
                ...data,
                id: formData?.id
            }
        }
        action({
            variables: {
                input: pretendId ? {
                        id: (data as any)[pretendId],
                        ...additionals
                    } :
                    {
                        ...additionals,
                        ...data
                    }
            },
        }).then(results => {
            setSucceed({
                state: true,
                message: "operation-succeed"
            });
            useForm?.reset();
            setTimeout(() => {
                setSucceed({
                    state: false,
                    message: "operation-succeed"
                });
                setFormData(null)
                DialogStore.closeFromOutside();
            }, 1000)
        }).catch(error => {
            console.debug(error);
        })
    }

    const onReset = () => {
        useForm?.reset();
        DialogStore.closeFromOutside()
    }

    return (
        <>
            <Form onSubmit={useForm?.handleSubmit(onSubmit, ctrl.onErrors)}>
                <RequestAlert error={error} success={succeed} loading={loading}/>
                <ModalBody>
                    <p className="bx--modal-header__heading">{t(description ?? "")}</p>
                    <br/>
                    {
                        inputs?.map((item: InputProps<V>) => {
                            return InputBuilder<V>({input: item, form: useForm});
                        })
                    }
                </ModalBody>
                <ModalFooter>
                    <ModalActionsUI reset={onReset} loading={loading} succeed={succeed}/>
                </ModalFooter>
            </Form>
        </>
    );

}

export default observer(FormGenerator);
