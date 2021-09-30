import ArticleStore from "./ArticleStore";
import {v4 as uuidv4} from "uuid";

describe("article", () => {
    it("should get an object", () => {
        const articleStore = ArticleStore;
        expect(articleStore).not.toBeNull();
        expect(typeof articleStore).toBe("object");
    })

    it("should set an article and get it well", () => {
        const articleStore = ArticleStore;
        ArticleStore.setArticle({
            id: uuidv4(),
            title: "New article",
            content: "A little text",
            link: "https://www.youtube.com/watch?v=_9JTTGI9-K0&t=1780s"
        })
        expect(ArticleStore.getArticle).not.toBeNull();
        expect(typeof ArticleStore.getArticle).toBe("object");
        expect(typeof ArticleStore.getArticle?.title).not.toBeUndefined();
    })
})