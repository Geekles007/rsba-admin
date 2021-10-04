import {DenormalizedRow} from "carbon-components-react";
import DialogStore from "../../../stores/DialogStore";
import {GenericDeleteProps} from "../../../common/generic-delete";
import GenericDelete from "./../../../common/generic-delete";
import ArticleStore from "../../../stores/ArticleStore";
import {ioClient} from "../../../services/client";
import {DELETE_ARTICLE} from "../../../services/mutations/article";

class PreviewHandlerController {

    deleteArticle(token: string, clear: () => void) {
        const options: GenericDeleteProps<DenormalizedRow> = {
            text: "Вы уверены, что хотите удалить эту статью?",
            id: ArticleStore.selected ?? "",
            clear: clear,
            operation: {
                node: DELETE_ARTICLE,
                variables: {
                    client: ioClient
                },
                context: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
        }
        DialogStore.openFromOutside({
            title: 'Удалить статью',
            content: <GenericDelete {...options} />,
            size: 'xs'
        })
    }

}

export default new PreviewHandlerController();