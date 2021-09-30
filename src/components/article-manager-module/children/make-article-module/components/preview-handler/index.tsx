import React, {memo} from "react";
import {observer} from "mobx-react";
import ArticleStore from "../../../../stores/ArticleStore";
import {PreviewHandlerWrapper} from "./style/default";
import YoutubeEmbedder from "../../common/youtube-embedder";
import {AccordionSkeleton, SkeletonPlaceholder, SkeletonText} from "carbon-components-react";
import EmptyPreviewState from "../../common/empty-state";

const PreviewHandler = () => {

    return (
        <PreviewHandlerWrapper>
            {
                ArticleStore.getArticle.title && ArticleStore.getArticle.title !== "" ? <h1>{ArticleStore.getArticle?.title}</h1> : <SkeletonText width={"400px"} />
            }
            {
                ArticleStore.getArticle.content && ArticleStore.getArticle.content !== "" ?
                    <p className={"content_container"} dangerouslySetInnerHTML={{__html: ArticleStore.getArticle?.content ?? ""}} /> :
                    <EmptyPreviewState />
            }

            {
                ArticleStore.getArticle.link && ArticleStore.getArticle.link !== "" ?
                <YoutubeEmbedder videoId={ArticleStore.getArticle?.link ?? ""} /> :
                    <SkeletonText />
            }
        </PreviewHandlerWrapper>
    );

}

export default observer(PreviewHandler);