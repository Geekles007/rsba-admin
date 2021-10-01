import React, {memo} from "react";
import {observer} from "mobx-react";
import ArticleStore from "../../stores/ArticleStore";
import {PreviewHandlerWrapper} from "./style/default";
import YoutubeEmbedder from "./children/youtube-embedder";
import {SkeletonText} from "carbon-components-react";
import EmptyPreviewState from "./children/empty-state";

const PreviewHandler = () => {
    
    const article = ArticleStore.getArticle;

    const clear = () => {
        ArticleStore.clear();
    }

    return (
        <PreviewHandlerWrapper>
            {
                ArticleStore.selected ?
                    <ul className="bx--breadcrumb">
                        <li onClick={clear} className={"backButton bx--breadcrumb-item"}>Главная</li>
                        <li className={"bx--breadcrumb-item--current"}>{article.title}</li>
                    </ul> : <></>
            }
            {
                article.title && article?.title !== "" ? <h1>{article?.title}</h1> : <SkeletonText width={"400px"} />
            }
            {
                article.content && article?.content !== "" ?
                    <p className={"content_container"} dangerouslySetInnerHTML={{__html: article?.content ?? ""}} /> :
                    <EmptyPreviewState />
            }
            {
                article.link && article?.link !== "" ?
                <YoutubeEmbedder videoId={article?.link ?? ""} /> :
                    <SkeletonText />
            }
        </PreviewHandlerWrapper>
    );

}

export default observer(PreviewHandler);