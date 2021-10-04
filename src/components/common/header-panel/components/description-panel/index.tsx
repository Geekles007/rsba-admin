import {memo} from "react";
import * as React from "react";
import styled from "styled-components";
import {Column, Grid, Tile, Row} from "carbon-components-react";
import ActionsPanel, {Action} from "../actions-panel";
import {useTranslation} from "react-i18next";
import {gray50, gray80} from "@carbon/colors";
// @ts-ignore
import {v4 as uuidv4} from "uuid";;

const DescPanelWrapper = styled(Tile)`
  width: 100%;
  padding-right: 0 !important;
  padding-left: 0 !important;

  .custom-grid {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .column-item {
    margin-bottom: 1.5em;
    display: flex;
    flex-direction: column;

    strong {
      margin-bottom: .5em;
    }

    span {
      color: ${gray50};
      font-size: .9em;
    }

    .sub-item {
      display: flex;
      margin-bottom: .5em;
      align-items: center;

      span {
        width: 150px;
        margin-right: .5em;
      }

      p {
        font-size: .9em;
      }
    }
  }
`;

export interface DescriptionPanelProps {
    title?: string;
    subTitle?: JSX.Element | string;
    description?: string;
    item?: Map<string, string>;
    actions?: Action[];
}

const DescriptionPanel: React.FC<DescriptionPanelProps> = ({
                                                               title,
                                                               subTitle,
                                                               description,
                                                               item,
                                                               actions
                                                           }) => {
    const {t} = useTranslation("translation", {useSuspense: false});
    let more: Map<string, string> = new Map<string, string>();

    if (item) {
        for (let [key, value] of Object.entries(item)) {
            more.set(key, value.toString());
        }
    }

    return (
        <DescPanelWrapper>
            <Grid className={"custom-grid"}>
                <Row>
                    <Column lg={5}>
                        <div className="column-item">
                            <h2>{title}</h2>
                            {subTitle}
                        </div>
                        <div className="column-item">
                            <strong>{t('description-text')}</strong>
                            <span>{(description === null ?? description === "") ? "-" : description}</span>
                        </div>
                    </Column>
                    <Column lg={5}>
                        {
                            item ?
                                <div className="column-item">
                                    <strong>{t('details-text')}</strong>
                                    {
                                        Array.from(more).map(([key, value]) => {
                                            return (
                                                <div className="sub-item" key={uuidv4()}>
                                                    <span>{t(key)}</span> {key.toLowerCase() === "email" ?
                                                    <a href={value}>{value}</a> : <p>{value}</p>}
                                                </div>
                                            );
                                        })
                                    }
                                </div> : null
                        }
                    </Column>
                    <Column lg={2}>
                        <ActionsPanel actions={actions}/>
                    </Column>
                </Row>

            </Grid>
        </DescPanelWrapper>
    );

}

export default memo(DescriptionPanel);
