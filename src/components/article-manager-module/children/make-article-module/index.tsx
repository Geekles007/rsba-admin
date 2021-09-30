import {memo} from "react";
import * as React from "react";
import {Column, Grid, Row, Tile} from "carbon-components-react";
import styled from "styled-components";
import MakeArticleForm from "./components/make-article-form";
import PreviewHandler from "./components/preview-handler";

interface MakeArticleModuleProps {
    token: string;
}

const MakeArticleModuleWrapper = styled.div`
  
`;

const MakeArticleModule = ({token}: MakeArticleModuleProps) => {

    return (
        <MakeArticleModuleWrapper>
            <Grid>
                <Row condensed>
                    <Column lg={4}>
                        <MakeArticleForm token={token}/>
                    </Column>
                    <Column lg={8}>
                        <PreviewHandler/>
                    </Column>
                </Row>
            </Grid>
        </MakeArticleModuleWrapper>
    );

}

export default memo(MakeArticleModule);