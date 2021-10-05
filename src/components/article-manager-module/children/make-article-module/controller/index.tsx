import * as yup from "yup";
import {EditArticleProps} from "../../../models/EditArticleProps";

class MakeArticleController {

    private readonly EDIT_ARTICLE_PROPS: EditArticleProps = {
        title: "title",
        content: "content",
        link: "link",
    };


    get fields() {
        return this.EDIT_ARTICLE_PROPS;
    }

    get MySchema() {
        return yup.object().shape({
            title: yup.string().required(),
            content: yup.string(),
            link: yup.string().required()
        });
    }

    onErrors() {}

}

export default new MakeArticleController();