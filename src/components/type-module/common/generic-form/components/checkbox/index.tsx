import {ChangeEvent, memo} from "react";
import * as React from 'react';
import {Checkbox, Toggle} from "carbon-components-react";
import {GenericFormProps} from "../../model/GenericFormProps";

interface CheckboxUIProps {
    name: string;
    labelText?: string;
    form?: GenericFormProps;
    id: string;
    defaultValue?: boolean;
}

const CheckboxUI: React.FC<CheckboxUIProps> = ({
                                name,
                                labelText,
                                defaultValue,
                                form,
                                id
                              }) => {

    form?.register({name: name as string}, {required: true});

    form?.setValue(name, false);

    return (
        <>
            <Checkbox
                labelText={labelText as string}
                id={id}
                name={name}
                checked
                onChange={(async (picked: ChangeEvent<HTMLInputElement>) => {
                    if (!picked) {
                        // form?.setError(name, message);
                    } else {
                        form?.setValue(name, picked);
                    }
;               })}
            />
        </>
    );

}

export default memo(CheckboxUI);