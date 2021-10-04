import { memo } from "react";
import * as React from 'react';
import { InlineNotification, InlineLoading } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import {ISuccess} from "../../models/ISuccess";

const RequestAlert: React.FC<{
    loading: boolean,
    error: any,
    success?: ISuccess
}> = ({loading, error, success}) => {
    const {t} = useTranslation(undefined, {useSuspense: false});
    let answer: JSX.Element | null = null;

    // const getErrorMessage = () => {
    //     let _message;
    //     if (error instanceof ApolloError) {
    //         // @ts-ignore
    //         for (const [key, value] of error?.graphQLErrors?.entries()) {
    //             const position = value.message.lastIndexOf(']');
    //             _message = value.message.substring(position + 1);
    //         }
    //         return _message;
    //     }
    // }
    
    if(loading) {
        answer = (
            <div>
                <InlineLoading description={t('loading-text')} />
            </div>
        )
    }
    
    if(error) {
        answer = (
            <div>
                <InlineNotification
                kind="error"
                subtitle={<span>
                    {error.message}
                </span>}
                title=""
                />
            </div> 
        )
    }
    
    if(success?.state) {
        answer = (
            <div>
                <InlineNotification
                kind="success"
                subtitle={<span>
                    {t(success?.message)}
                </span>}
                title=""
                />
            </div>
        )
    }

    return answer;
}

export default memo(RequestAlert);
