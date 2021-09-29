import {EditArticleProps} from "../../../models/EditArticleProps";
import * as yup from "yup";

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
            content: yup.string().required(),
            link: yup.string().required()
        });
    }


}

export default new MakeArticleController();