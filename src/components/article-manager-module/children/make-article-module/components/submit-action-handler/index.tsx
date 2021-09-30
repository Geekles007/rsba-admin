import {memo, useState} from "react";
import {Button, InlineLoading} from "carbon-components-react";
import {ArrowRight32} from "@carbon/icons-react";
import styled from "styled-components";
import {ISuccess} from "../form-handler";

const SubmitWrapper = styled.div`
  margin-top: 2em;
  
  .inline-loading-text{
    color: #fff !important;
  }
`;

interface SubmitHandlerProps {
    loading: boolean;
    succeed: ISuccess;
}

const SubmitActionHandler = ({ succeed, loading}: SubmitHandlerProps) => {

    return (
        <SubmitWrapper>
            {
                loading || succeed.state ?
                    <InlineLoading
                        style={{ marginLeft: '1rem' }}
                        description={loading ? ("Loading...") : ("Сохранить успешно")}
                        status={succeed.state ? 'finished' : 'active'}
                        aria-live={"polite"}
                    /> : (
                        <Button
                            kind="secondary"
                            size={"field"}
                            type="submit">
                            {("Save this article")}
                        </Button>
                    )
            }
        </SubmitWrapper>
    );

}

export default memo(SubmitActionHandler);