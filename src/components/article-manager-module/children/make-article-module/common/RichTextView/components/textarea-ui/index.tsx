import {memo, useEffect, useRef} from "react";
import * as React from "react";
import styled from "styled-components";
import {gray30} from "@carbon/colors";
import InputStore from "../../store/InputStore";
import RichTextViewController from "./../../controller";
import {decrypt, encrypt} from "../../services/encryption";

interface TextareaUIProps {
    defaultValue: string;
    notifier?: (...args: any) => void;
    placeholder?: string;
    isReadOnly: boolean;
}

const TextareaUIWrapper = styled.div`
  flex: 1 1 auto;
  border-top: 1px solid ${gray30};
  flex-grow: 1;
  overflow-wrap: break-word;
  max-height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid ${gray30};

  .bx--form-item, .bx--text-area__wrapper {
    height: 100% !important;
  }

  &.bx--text-area {
    height: 100% !important;
    padding: .5em;
    border-bottom: none;
    outline: none !important;

    &::-webkit-resizer {
      display: none;
    }
  }

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,.1);
    border-radius: 3px;

    &:hover {
      background: rgba(255,255,255,.2);
    }
  }
`;

const TextareaUI = ({defaultValue, placeholder, notifier, isReadOnly}: TextareaUIProps) => {

    let refEl = useRef(null);

    const onChange = (e: any) => {
        const content = e.target?.innerHTML;
        InputStore.setInput(content);

        if (notifier && !isReadOnly) {
            try {
                notifier((content));
            } catch (e) {
                console.debug(e);
            }
        }
    }

    useEffect(() => {
        const editor: any = document.getElementById("editor");
        editor?.addEventListener("focus", () => {
            document.onselectionchange = e => {
                RichTextViewController.checkHowIsWritten();
            }
        })
        editor.focus();
    }, []);

    return (
        <TextareaUIWrapper
            dangerouslySetInnerHTML={{__html: RichTextViewController.getData(decrypt(defaultValue))}}
            onInput={onChange}
            onBlur={onChange}
            placeholder={placeholder}
            id={"editor"}
            ref={(el: any) => refEl = el}
            className={"bx--text-area"}
            aria-placeholder={placeholder}
            contentEditable={true}/>
    );

}

export default memo(TextareaUI);