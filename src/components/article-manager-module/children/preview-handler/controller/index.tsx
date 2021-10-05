import {DenormalizedRow} from "carbon-components-react";
import {ioClient} from "../../../services/client";
import {DELETE_ARTICLE} from "../../../services/mutations/article";
import ArticleStore from "../../../stores/ArticleStore";
import DialogStore from "../../../stores/DialogStore";
import GenericDelete, {GenericDeleteProps} from "../../../common/generic-delete";

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