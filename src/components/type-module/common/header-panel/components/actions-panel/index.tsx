import {memo} from "react";
import * as React from "react";
import {CarbonIconType} from "@carbon/icons-react";
import {v4 as uuidv4} from "uuid";
import {Button} from "carbon-components-react";
import styled from "styled-components";

export interface Action {
    title: string;
    func: () => void;
    icon?: CarbonIconType;
    iconOnly?: boolean;
}

export interface ActionsPanelProps {
    actions?: Action[]
}

const ActionList = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const ActionsPanel: React.FC<ActionsPanelProps> = ({actions= []}) => {

    return (
        <ActionList>
            {
                actions?.map((action: Action) => {
                    return (
                        <Button key={uuidv4()}
                                onClick={action.func}
                                small
                                style={{marginRight: ".5em"}}
                                hasIconOnly={action.iconOnly}
                                renderIcon={action.icon}
                                tooltipAlignment="center"
                                kind={"secondary"}
                                tooltipPosition="bottom"
                                iconDescription={action.title}>{action.title}</Button>
                    );
                })
            }
        </ActionList>
    );

}

export default memo(ActionsPanel);
