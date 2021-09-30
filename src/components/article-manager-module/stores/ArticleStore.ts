import {IArticle} from "../models/IArticle";
import {action, computed, makeObservable, observable} from "mobx";

class ArticleStore {

    article: IArticle = {};

    constructor() {
        makeObservable(this, {
            article: observable,
            setArticle: action,
            getArticle: computed
        })
    }

    setArticle(article: IArticle) {
        this.article = article;
    }

    get getArticle() {
        return this.article;
    }

}

export default new ArticleStore();