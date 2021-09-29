import {memo, useCallback, useState} from "react";
import {FormProps} from "../../../../models/FormProps";
import styled from "styled-components";
import {TextInput} from "carbon-components-react";
import {v4 as uuidv4} from "uuid";
import MakeArticleController from "./../../controller";
import RichTextView from "../../common/RichTextView";

interface FormHandlerProps {
    formProps: FormProps;
}

const FormControl = styled.div`
  margin-top: 2em;
`;

const FormHandler = ({formProps}: FormHandlerProps) => {

    const {handleSubmit, register, reset, setValue, setError, errors} = formProps;
    const [content, setContent] = useState("");

    const setContentHandler = useCallback((value) => {
        console.log(value);
    }, [content])

    return (
        <>
            <FormControl>
                <TextInput
                    id={uuidv4()}
                    invalidText={"Название"}
                    ref={register}
                    name={MakeArticleController.fields.title}
                    labelText={('Название') as string + "*"}
                    placeholder={('Введите название') as string}
                    invalid={errors.title !== undefined} />
            </FormControl>
            <FormControl>
                <RichTextView defaultValue={""}
                              notifier={setContentHandler}
                              placeholder={"Напишите содержание здесь ..."}/>
            </FormControl>
        </>
    );

}

export default memo(FormHandler);