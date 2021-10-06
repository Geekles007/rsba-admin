import {memo, useEffect, useState} from "react";
import * as React from 'react';
import { InlineNotification, InlineLoading } from "carbon-components-react";
import { useTranslation } from "react-i18next";
import {ISuccess} from "../../models/ISuccess";
import ApolloErrorInterceptor from "../../services/ApolloErrorInterceptor";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";

const CustomErrorPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem !important;
`;

const RequestAlert: React.FC<{
    loading: boolean,
    error: any,
    success?: ISuccess
}> = ({loading, error, success}) => {
    const {t} = useTranslation(undefined, {useSuspense: false});
    let answer: JSX.Element | boolean | null = null;
    const [errors, setErrors] = useState<ApolloErrorInterceptor>();

    useEffect(() => {
        if(error) {
            setErrors(new ApolloErrorInterceptor(error.graphQLErrors));
        }
    }, [error])
    
    if(loading) {
        answer = (
            <div>
                <InlineLoading description={t('loading-text')} />
            </div>
        )
    }
    
    if(errors) {
        answer = errors && errors.message.length > 0 && <CustomErrorPanel>{errors.message.map((msg: string, i: number) => {
                return <InlineNotification
                    kind={"error"}
                    key={uuidv4()}
                    subtitle={<span>{msg}</span>}
                    title={'Ошибка'}/>
            })}</CustomErrorPanel>;
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

    return <>
        {answer}
    </>
}

export default memo(RequestAlert);
