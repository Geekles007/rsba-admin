import {memo} from "react";
import * as React from "react";
import styled from "styled-components";
import {Button, CopyButton} from "carbon-components-react";
import {
    NumberSmall_132,
    NumberSmall_232, NumberSmall_332, TextAlignCenter32, TextAlignJustify32, TextAlignLeft32, TextAlignRight32,
    TextBold32,
    TextItalic32,
    TextUnderline32
} from "@carbon/icons-react";
import {gray30} from "@carbon/colors";
import RichTextViewController from "./../../controller";

const TextareaToolbarWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${gray30};

  .divider {
    border-left: 1px solid ${gray30};
  }

  ._active {
    background-color: ${gray30} !important;
  }
`;

interface TextareaToolbarProps {
    isReadOnly: boolean;
}


const TextareaToolbar = ({isReadOnly}: TextareaToolbarProps) => {

    return (
        <TextareaToolbarWrapper>
            <CopyButton id={"action-copy"} onClick={(e) => RichTextViewController.editing("copy", e, "action-copy")}/>
            <div className="align-group align-group__aspect divider">
                <Button disabled={isReadOnly} id={"action-bold"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("bold", e, "action-bold")}
                        renderIcon={TextBold32} tooltipPosition="top"
                        iconDescription={"Полужирный"} size={"field"}/>
                <Button disabled={isReadOnly} id={"action-italic"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("italic", e, "action-italic")}
                        renderIcon={TextItalic32} tooltipPosition="top"
                        iconDescription={"Курсив"} size={"field"}/>
                <Button disabled={isReadOnly} id={"action-underline"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("underline", e, "action-underline")}
                        renderIcon={TextUnderline32} tooltipPosition="top"
                        iconDescription={"Подчеркните"} size={"field"}/>
                <Button disabled={true} id={"action-h1"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("h1", e, "action-h1")}
                        renderIcon={NumberSmall_132} tooltipPosition="top"
                        iconDescription={"Заголовок 1"} size={"field"}/>
                <Button disabled={true} id={"action-h2"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("h2", e, "action-h2")}
                        renderIcon={NumberSmall_232} tooltipPosition="top"
                        iconDescription={"Заголовок 2"} size={"field"}/>
                <Button disabled={true} id={"action-h3"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("h3", e, "action-h3")}
                        renderIcon={NumberSmall_332} tooltipPosition="top"
                        iconDescription={"Заголовок 2"} size={"field"}/>
            </div>
            <div className="action-group action-group__align divider">
                <Button disabled={isReadOnly} id={"action-align-left"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("left", e, "action-align-left")}
                        renderIcon={TextAlignLeft32} tooltipPosition="top"
                        iconDescription={"слева"} size={"field"}/>
                <Button disabled={isReadOnly} id={"action-align-center"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("center", e, "action-align-center")}
                        renderIcon={TextAlignCenter32} tooltipPosition="top"
                        iconDescription={"Центр"} size={"field"}/>
                <Button disabled={isReadOnly} id={"action-align-right"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("right", e, "action-align-right")}
                        renderIcon={TextAlignRight32} tooltipPosition="top"
                        iconDescription={"вправо"} size={"field"}/>
                <Button disabled={isReadOnly} id={"action-align-justify"} kind={"secondary"} hasIconOnly
                        onClick={(e) => RichTextViewController.editing("justify", e, "action-align-justify")}
                        renderIcon={TextAlignJustify32} tooltipPosition="top"
                        iconDescription={"оправдать"} size={"field"}/>
            </div>
        </TextareaToolbarWrapper>
    );

}

export default memo(TextareaToolbar);