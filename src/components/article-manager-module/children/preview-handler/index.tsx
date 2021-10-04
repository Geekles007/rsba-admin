import React, {memo} from "react";
import {observer} from "mobx-react";
import ArticleStore from "../../stores/ArticleStore";
import {PreviewHandlerWrapper} from "./style/default";
import YoutubeEmbedder from "./children/youtube-embedder";
import {Button, SkeletonText} from "carbon-components-react";
import EmptyPreviewState from "./children/empty-state";
import styled from "styled-components";
import {TrashCan32} from "@carbon/icons-react";
import PreviewHandlerController from "./controller";
import {FormProps} from "../../../models/FormProps";

const HeaderPreview = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
`;

interface PreviewHandlerProps {
    token: string;
    form: FormProps;
}

const PreviewHandler = ({token, form}: PreviewHandlerProps) => {
    
    const article = ArticleStore.getArticle;

    const clear = () => {
        const editor = document?.getElementById("editor");
        ArticleStore.clear();
        form.reset();
        if (editor) {
            editor.innerHTML = "" as string;
        }
    }

    return (
        <PreviewHandlerWrapper>
            {
                (ArticleStore.selected && ArticleStore.selected !== "") ?
                    <HeaderPreview>
                        <ul className="bx--breadcrumb">
                            <li onClick={clear} className={"backButton bx--breadcrumb-item"}>Главная</li>
                            <li className={"bx--breadcrumb-item--current"}>{article.title}</li>
                        </ul>
                        <Button kind={"danger"} onClick={() => PreviewHandlerController.deleteArticle(token, clear)} renderIcon={TrashCan32}>Удалить</Button>
                    </HeaderPreview> : <></>
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