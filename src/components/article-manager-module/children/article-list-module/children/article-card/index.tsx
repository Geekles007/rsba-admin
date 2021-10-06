import React, {memo, useCallback} from "react";
import {IArticle} from "../../../../models/IArticle";
import DDSCardHeading from "@carbon/ibmdotcom-web-components/es/components-react/card/card-heading";
import DDSCardCTAFooter from "@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer";
import {ArrowDownRight32} from "@carbon/icons-react";
import DDSCard from "@carbon/ibmdotcom-web-components/es/components-react/card/card";
import ArticleStore from "../../../../stores/ArticleStore";

interface ArticleCardProps {
    article: IArticle
}

const ArticleCard = ({article}: ArticleCardProps) => {

    const select = useCallback((e: React.MouseEvent) => {
        const firstTab = document.getElementById("manager-article");
        e.preventDefault();
        ArticleStore.setSelected(article?.id ?? "");
        ArticleStore.setArticle(article);
        if(firstTab) {
            firstTab.click()
        }
    }, [])

    return (
        <div onClick={select}>
            <DDSCard href={"#"} className={"card-article"}>
                <DDSCardHeading><strong>{article?.title}</strong></DDSCardHeading>
                <p dangerouslySetInnerHTML={{__html: article?.content ?? ""}} />
                <DDSCardCTAFooter slot={"footer"}>
                    <ArrowDownRight32/>
                </DDSCardCTAFooter>
            </DDSCard>
        </div>
    );

}

export default memo(ArticleCard);