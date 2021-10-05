import {memo, useEffect} from "react";
import {InputProps} from "../../model/InputProps";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from "uuid";
import {NumberInput, TextArea} from "carbon-components-react";
import {GenericFormProps} from "../../model/GenericFormProps";
import {BaseProps} from "../../model/BaseProps";
import FromControlObject from "../combo-box";
import CustomNumberInput from "../custom-number-input";
import MultiSelector from "../mutiselect";
import CheckboxUI from "../checkbox";
import { FormControl } from "../../style/FormControl";
import { CustomInput } from "../../style/CustomInput";
import {TYPEINPUT} from "../../constants";

const InputBuilder = <V extends BaseProps>({input, form}: { input: InputProps<V>, form?: GenericFormProps }) => {

    const {t} = useTranslation("translation", {useSuspense: false});

    input = {
        ...input,
        helperText: t(input.helperText as string),
        invalidText: t(input.invalidText as string),
        labelText: t(input.labelText as string),
        placeholder: t(input.placeholder as string),
    }

    switch (input.type) {
        case TYPEINPUT.text:
            return (<FormControl key={input.id + input.name}>
                <CustomInput
                    helperText={input.helperText}
                    id={input.id ?? uuidv4()}
                    ref={form?.register}
                    defaultValue={input.defaultValue as string}
                    name={input.name}
                    invalidText={input.invalidText}
                    labelText={input.labelText}
                    placeholder={input.placeholder}
                    invalid={input?.invalid ? form?.errors[input?.invalid] !== undefined : false}
                />
            </FormControl>)
        case TYPEINPUT.textarea:
            return (<FormControl key={input.id + input.name}>
                <TextArea
                    helperText={input.helperText}
                    id={input.id}
                    ref={form?.register}
                    defaultValue={input.defaultValue as string}
                    name={input.name}
                    invalidText={input.invalidText}
                    labelText={input.labelText}
                    placeholder={input.placeholder}
                    invalid={input?.invalid ? form?.errors[input?.invalid] !== undefined : false}
                />
            </FormControl>)
        case TYPEINPUT.comboBox:
            return (<FormControl key={input.id + input.name}>
                <FromControlObject
                    helperText={input.helperText}
                    id={input.id}
                    defaultValue={input.defaultValue}
                    name={input.name}
                    invalidText={input.invalidText}
                    labelText={input.labelText}
                    placeholder={input.placeholder}
                    documentNode={input.documentNode}
                    client={input.client}
                    more={input.more}
                    variables={input.variables}
                    objectProperty={input.objectProperty}
                    form={form}
                />
            </FormControl>)
        case TYPEINPUT.multiselect:
            return (<FormControl key={input.id + input.name}>
                <MultiSelector
                    helperText={input.helperText}
                    id={input.id}
                    defaultValue={input.defaultValue}
                    name={input.name}
                    invalidText={input.invalidText}
                    labelText={input.labelText}
                    placeholder={input.placeholder}
                    documentNode={input.documentNode}
                    client={input.client}
                    objectProperty={input.objectProperty}
                    form={form}
                />
            </FormControl>)
        case TYPEINPUT.number:
            return (<FormControl key={input.id + input.name}>
                <CustomNumberInput
                    input={input}
                    former={form}
                />
            </FormControl>)
        case TYPEINPUT.checkbox:
            return (<FormControl key={input.id + input.name}>
                <CheckboxUI
                    name={input.name}
                    labelText={input.labelText}
                    form={form}
                    id={input.id ?? uuidv4()}
                    defaultValue={input.defaultValue}
                />
            </FormControl>)
    }

}

export default InputBuilder;
