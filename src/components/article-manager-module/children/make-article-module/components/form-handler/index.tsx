import {memo, useCallback, useState} from "react";
import styled from "styled-components";
import {Form, TextInput} from "carbon-components-react";
import {v4 as uuidv4} from "uuid";
import MakeArticleController from "./../../controller";
import RichTextView from "../../common/RichTextView";
import SubmitActionHandler from "../submit-action-handler";
import ArticleStore from "../../../../stores/ArticleStore";
import {encrypt} from "../../common/RichTextView/services/encryption";
import {useMutation} from "@apollo/client";
import {CREATE_EDIT_ARTICLE} from "../../../../services/mutations/article";
import InputStore from "../../common/RichTextView/store/InputStore";
import {FormProps} from "../../../../models/FormProps";

interface FormHandlerProps {
    formProps: FormProps;
    token: string;
}

const FormControl = styled.div`
  margin-top: 2em;
`;

export interface ISuccess {

    state?: boolean;
    message: string;
}

const FormHandler = ({formProps, token}: FormHandlerProps) => {

    const {handleSubmit, register, reset, setValue, errors} = formProps;
    const [succeed, setSucceed] = useState<ISuccess>({message: "operation-succeed"});
    const [action, {loading}] = useMutation(CREATE_EDIT_ARTICLE, {
        notifyOnNetworkStatusChange: true,
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    });

    const setContentHandler = useCallback((value) => {
        ArticleStore.setArticle({
            ...ArticleStore.getArticle,
            content: value
        });
        // setValue("content", encrypt(value));
    }, [ArticleStore.article]);

    const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        await ArticleStore.setArticle({
            ...ArticleStore.getArticle,
            [event.target.name]: event.target.value
        });
        setValue(event.target.name, event.target.value);
    }

    const init = () => {
        const editor = document?.getElementById("editor");
        ArticleStore.clear();
        InputStore.clear();
        if (editor) {
            editor.innerHTML = "" as string;
        }
    }

    const onSubmit = (data: Partial<any>,) => {
        action({
            variables: {
                input: {
                    id: ArticleStore.selected && ArticleStore.selected !== "" ? ArticleStore.getArticle?.id ?? "" : "",
                    ...data,
                    content: encrypt(ArticleStore.getArticle?.content ?? "")
                }
            },
        }).then(results => {
            setSucceed({
                state: true,
                message: "operation-succeed"
            });
            reset();
            init();
            setTimeout(() => {
                setSucceed({
                    state: false,
                    message: "operation-succeed"
                });
            }, 1000)
        }).catch(error => {
            console.debug(error);
        })
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, MakeArticleController.onErrors)}>
            <FormControl>
                <TextInput
                    id={uuidv4()}
                    invalidText={"Название"}
                    ref={register}
                    defaultValue={ArticleStore.selected && ArticleStore.selected !== "" ? ArticleStore.getArticle?.title ?? "" : ""}
                    onChange={onChangeHandler}
                    name={MakeArticleController.fields.title}
                    labelText={('Название') as string + "*"}
                    placeholder={('Введите название') as string}
                    invalid={errors.title !== undefined}/>
            </FormControl>
            <FormControl>
                <RichTextView defaultValue={ArticleStore.selected && ArticleStore.selected !== "" ? ArticleStore.getArticle?.content ?? "" : ""}
                              notifier={setContentHandler}
                              placeholder={"Напишите содержание здесь ..."}/>
            </FormControl>
            <FormControl>
                <TextInput
                    id={uuidv4()}
                    invalidText={"Введите идентификатор видео на youtube"}
                    type={"text"}
                    ref={register}
                    defaultValue={ArticleStore.selected && ArticleStore.selected !== "" ? ArticleStore.getArticle?.link ?? "" : ""}
                    onChange={onChangeHandler}
                    name={MakeArticleController.fields.link}
                    labelText={('Введите идентификатор видео на youtube') as string}
                    placeholder={('Введите идентификатор видео на youtube') as string}
                    invalid={errors.link !== undefined}/>
            </FormControl>
            <SubmitActionHandler loading={loading} succeed={succeed}/>
        </Form>
    );

}

export default memo(FormHandler);