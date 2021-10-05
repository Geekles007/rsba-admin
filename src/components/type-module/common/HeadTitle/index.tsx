import {memo} from "react";
import * as React from "react";
import {ArrowLeft20} from "@carbon/icons-react";
import styled from "styled-components";
import {gray50, gray70} from "@carbon/colors";

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    cursor: pointer;
    margin-right: 1em;
    color: white;
  }
  
  .__titler {
    display: flex;
    flex-direction: column;
    
    span {
      font-size: 1em;
      color: ${gray50};
    }
  }
`;

interface HeadTitleProps {
    shown?: boolean;
    title?: string | JSX.Element;
    description?: string;
    close?: () => void
}

const HeadTitle: React.FC<HeadTitleProps> = ({
                                                 shown = true,
                                                 title,
                                                 description,
                                                 close
                                             }) => {
    return (

        <TitleWrapper>
            <div className={"__titler"}>
                <h2>{title}</h2>
                <span>{description}</span>
            </div>
            {
                close && shown ?
                    <a onClick={close}><ArrowLeft20/></a> : <></>
            }
        </TitleWrapper>
    )
}

export default memo(HeadTitle);