import {IArticle} from "../models/IArticle";
import {action, computed, makeObservable, observable} from "mobx";

class ArticleStore {

    article: IArticle = {};
    selected: number = 0;

    constructor() {
        makeObservable(this, {
            article: observable,
            setArticle: action,
            getArticle: computed,
            clear: action,
            selected: observable,
            setSelected: action
        })
    }

    clear() {
        this.article = {
            id: "",
            link: "",
            title: "",
            content: ""
        }
        this.selected = 0;
    }

    setSelected(selected: number) {
        this.selected = selected;
    }

    setArticle(article: IArticle) {
        this.article = article;
    }

    get getArticle() {
        return this.article;
    }

}

export default new ArticleStore();