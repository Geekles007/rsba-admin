import * as React from 'react';
import {memo, useState} from 'react';
import {OperationVariables} from "@apollo/client/core";
import {DocumentNode} from "graphql";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import {Button, InlineLoading, ModalBody, ModalFooter} from "carbon-components-react";
import DialogStore from "../../stores/DialogStore";
import {ISuccess} from "../../models/ISuccess";

interface BaseModelConfirm {
    id?: string
}

interface IOperationProps {
    variables: OperationVariables,
    node: DocumentNode
}

export interface GenericConfirmationProps {
    text?: string;
    list?: string[];
    variables?: {
        [key: string]: any
    } | string;
    firstKey?: string;
    secondKey?: string;
    secondId?: string | string[];
    operation: IOperationProps;
    loop?: boolean
}

const GenericConfirmation = ({
                                 list,
                                 operation,
                                 text,
                                 loop = true,
                                 variables,
                                 secondKey = "",
                                 secondId,
                                 firstKey = ""
                             }: GenericConfirmationProps) => {
    const [succeed, setSucceed] = useState<ISuccess>({message: "operation-succeed"});
    const {t} = useTranslation('translation', {useSuspense: false});
    const [action, {loading, data, error}] = useMutation(operation?.node, operation?.variables);

    const onExecute = () => {
        loop ?
            list?.map((item: string) => {
                action({
                    variables: {
                        input: typeof variables === "string" ? variables : {
                            [firstKey]: item,
                            [secondKey]: secondId
                        }
                    },
                }).then(results => {
                    setSucceed({
                        state: true,
                        message: "operation-succeed"
                    });
                    DialogStore.closeFromOutside();
                    setTimeout(() => {
                        setSucceed({
                            state: false,
                            message: "operation-succeed"
                        });
                    }, 2000)
                }).catch(error => {
                    console.debug(error);
                });
            })
            : action({
                variables: {
                    input: variables
                },
            }).then(results => {
                setSucceed({
                    state: true,
                    message: "operation-succeed"
                });
                DialogStore.closeFromOutside();
                setTimeout(() => {
                    setSucceed({
                        state: false,
                        message: "operation-succeed"
                    });
                }, 2000)
            }).catch(error => {
                console.debug(error);
            });
    }

    return (
        <>
            <ModalBody className="rs-modal-body">
                <span>{t(text as string)}</span>
            </ModalBody>

            <ModalFooter>
                <Button
                    kind="secondary"
                    type="button"
                    onClick={() => DialogStore.closeFromOutside()}>
                    {t('no-text')}
                </Button>
                {
                    loading || succeed.state ?
                        <InlineLoading
                            style={{marginLeft: '1rem'}}
                            description={loading ? t('loading-text') : t('operation-finished')}
                            status={succeed.state ? 'finished' : 'active'}
                            aria-live={"polite"}
                        /> : (
                            <Button
                                kind="danger"
                                type="button"
                                onClick={onExecute}>
                                {t('yes-text')}
                            </Button>
                        )
                }
            </ModalFooter>
        </>
    );

}

export default memo(GenericConfirmation);
