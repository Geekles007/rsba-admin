import {memo, useEffect, useState} from "react";
import * as React from 'react';
import {useMutation} from "@apollo/client";
import {OperationVariables} from "@apollo/client/core";
import {DocumentNode} from "graphql";
import {Button, InlineLoading, ModalBody, ModalFooter} from "carbon-components-react";
import DialogStore from "../../stores/DialogStore";
import {ISuccess} from "../../article-manager-module/children/make-article-module/components/form-handler";

interface IOperationProps {
    variables: OperationVariables,
    context: any;
    node: DocumentNode
}

export interface GenericDeleteProps<V extends BaseModelDelete> {
    text?: string;
    id?: string;
    clear: () => void;
    operation: IOperationProps;
}

interface BaseModelDelete {
    id?: string
}

const GenericDelete = <T extends BaseModelDelete>({
                                                      id, operation, text, clear
                                                  }: GenericDeleteProps<T>) => {
    const [succeed, setSucceed] = useState<ISuccess>({message: "operation-succeed"});
    const [action, {loading, data, error}] = useMutation(operation?.node, {
        notifyOnNetworkStatusChange: true,
        ...operation?.variables,
        context: operation.context
    });

    useEffect(() => {
        return function cleanup() {
            DialogStore.clear();
        }
    }, []);

    const onDelete = () => {
        action({
            variables: {input: id},
        }).then(results => {
            setSucceed({
                state: true,
                message: "operation-succeed"
            });
            setTimeout(() => {
                setSucceed({
                    state: false,
                    message: "operation-succeed"
                });
            }, 1000)
            clear();
            DialogStore.closeFromOutside();
        }).catch(error => {
            console.debug(error);
        });
    }

    const closeModal = () => {
        DialogStore.setOpen(false);
        DialogStore.clear();
    }

    return (
        <>
            <ModalBody className="rs-modal-body">
                <span>{(text as string)}</span>
            </ModalBody>

            <ModalFooter>
                <Button
                    kind="secondary"
                    type="button"
                    onClick={closeModal}>
                    {('Нет')}
                </Button>
                {
                    loading || succeed.state ?
                        <InlineLoading
                            style={{marginLeft: '1rem'}}
                            description={loading ? ('Загрузка...') : ('Удалено успешно')}
                            status={succeed.state ? 'finished' : 'active'}
                            aria-live={"polite"}
                        /> : (
                            <Button
                                kind="danger"
                                type="button"
                                onClick={onDelete}>
                                {"Да"}
                            </Button>
                        )
                }
            </ModalFooter>
        </>
    );
}

export default (memo(GenericDelete));
