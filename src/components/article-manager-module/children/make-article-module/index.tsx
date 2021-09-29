import {memo} from "react";
import * as React from "react";
import {Column, Grid, Row, Tile} from "carbon-components-react";
import styled from "styled-components";
import MakeArticleForm from "./components/make-article-form";

interface MakeArticleModuleProps {

}

const MakeArticleModuleWrapper = styled.div`
  
`;

const MakeArticleModule = ({}: MakeArticleModuleProps) => {

    return (
        <MakeArticleModuleWrapper>
            <Grid>
                <Row condensed>
                    <Column lg={4}>
                        <MakeArticleForm />
                    </Column>
                    <Column lg={8}>
                        Preview
                    </Column>
                </Row>
            </Grid>
        </MakeArticleModuleWrapper>
    );

}

export default memo(MakeArticleModule);