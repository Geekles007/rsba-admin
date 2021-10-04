import {memo} from "react";
import * as React from "react";
import {Column, Grid, Row} from "carbon-components-react";
import styled from "styled-components";
import MakeArticleForm from "./components/make-article-form";
import PreviewHandler from "../preview-handler";
import {useForm} from "react-hook-form";
import {FormProps} from "../../models/FormProps";
import {yupResolver} from "@hookform/resolvers/yup";
import MakeArticleController from "./controller";

interface MakeArticleModuleProps {
    token: string;
}

const MakeArticleModuleWrapper = styled.div`
  
`;

const MakeArticleModule = ({token}: MakeArticleModuleProps) => {
    const formProps = useForm<FormProps>({
        resolver: yupResolver(MakeArticleController.MySchema)
    });

    return (
        <MakeArticleModuleWrapper>
            <Grid>
                <Row condensed>
                    <Column lg={4}>
                        <MakeArticleForm formProps={formProps} token={token}/>
                    </Column>
                    <Column lg={8}>
                        <PreviewHandler form={formProps} token={token}/>
                    </Column>
                </Row>
            </Grid>
        </MakeArticleModuleWrapper>
    );

}

export default memo(MakeArticleModule);