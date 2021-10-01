// @ts-ignore
import React, {memo, useEffect} from 'react';
import {EmptyWrapper} from "./empty-state-style/default";
import {Button} from "carbon-components-react";
import { Archive } from '@carbon/pictograms-react';

interface EmptyStateUiProps {
    title: string;
    text?: string;
    action?: () => void;
    actionTitle?: string;
}

const EmptyStateUI = ({
                                                       action,
                                                       title = "",
                                                       text = "",
                                                       actionTitle = ""
                                                   }: EmptyStateUiProps) => {

    return (
        <EmptyWrapper>
            <div className="little-text">
                <Archive />
                <h4>{title}</h4>
                <span>{text}</span>
                {
                    action ?
                        <Button className={"pointer"} onClick={action}>{actionTitle}</Button> : null
                }
            </div>
        </EmptyWrapper>
    );

}

export default memo(EmptyStateUI);
