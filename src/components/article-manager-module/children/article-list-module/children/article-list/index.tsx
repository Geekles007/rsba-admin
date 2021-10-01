import {memo} from "react";
import {IArticle} from "../../../../models/IArticle";
import {Column, Grid, Row} from "carbon-components-react";
import styled from "styled-components";
import {decrypt} from "../../../make-article-module/common/RichTextView/services/encryption";
import {v4 as uuidv4} from "uuid";
import ArticleCard from "../article-card";

interface ArticleListProps {
    refresher: string;
    data: IArticle[]
}

const ArticleListWrapper = styled.div`
  padding: 2em 0;
  
  .card-article {
    margin-top: 1px;
    
    p {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const ArticleList = ({data, refresher}: ArticleListProps) => {

    return (
        <ArticleListWrapper key={refresher}>
            <Grid>
                <Row condensed>
                    {
                        (data).map(item => {
                            const content = decrypt(item?.content ?? "");
                            return <Column lg={3} key={uuidv4()}>
                                    <div className="card-article">
                                        <ArticleCard article={{
                                            ...item,
                                            content: content
                                        }} />
                                    </div>
                                </Column>
                        })
                    }
                </Row>
            </Grid>
        </ArticleListWrapper>
    );

}

export default memo<ArticleListProps>(ArticleList);