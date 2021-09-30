import {memo} from "react";
import * as React from "react";
import styled from "styled-components";
import TextareaToolbar from "./components/toolbar";
import TextareaUI from "./components/textarea-ui";
import {gray30, gray60, gray90} from "@carbon/colors";
import {decrypt} from "./services/encryption";

interface RichTextViewProps {
    defaultValue: string;
    notifier?: (...args: any) => void;
    placeholder?: string;
    isReadOnly?: boolean;
}

const RichTextViewWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-flow: column;
  min-width: 100px;
  width: 100%;
  max-width: 100%;
  min-height: 200px;
  overflow-y: visible;
  border-bottom: 1px solid #fff;

  b {
    font-weight: 700;
  }

  i {
    font-style: italic;
  }
`;

const CustomSection = styled.section`
  b {
    font-weight: 700;
  }

  i {
    font-style: italic;
  }
`;

const RichTextView = ({
                          defaultValue,
                          notifier,
                          placeholder = "Введите описание",
                          isReadOnly = false
                      }: RichTextViewProps) => {

    if (isReadOnly) {
        return <CustomSection
            dangerouslySetInnerHTML={{__html: decrypt(defaultValue) ?? ""}}/>;
    }

    return <RichTextViewWrapper>
        <TextareaToolbar isReadOnly={isReadOnly}/>
        <TextareaUI defaultValue={defaultValue} notifier={notifier} placeholder={placeholder} isReadOnly={isReadOnly}/>
    </RichTextViewWrapper>
}

export default memo<RichTextViewProps>(RichTextView);
