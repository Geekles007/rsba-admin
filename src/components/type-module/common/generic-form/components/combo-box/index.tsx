import {memo, useEffect, useMemo} from "react";
import * as React from "react";
import {ComboBox, InlineLoading} from "carbon-components-react";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from "uuid";
import {InputProps} from "../../model/InputProps";
import {BaseProps} from "../../model/BaseProps";
import GenericQueryAll from "../../../generic-query-all";
import EmptyStateUI from "../../../empty-state";

const FromControlObject = <V extends BaseProps>({
                                                    documentNode,
                                                    name,
                                                    labelText,
                                                    placeholder,
                                                    form,
                                                    defaultValue,
                                                    client,
                                                    objectProperty,
                                                    variables,
                                                    more
                                                }: InputProps<V>) => {

    const {t} = useTranslation('translation', {useSuspense: false})
    
    useEffect(() => console.debug('…'), [documentNode]);

    const reversed = useMemo(() => new Map<string, any>(), []);

    const {values: data, outcome: all} = GenericQueryAll({
        node: documentNode!,
        client: client,
        variables: variables
    });

    form?.register({name: name}, {required: true});

    if (all.loading) return <InlineLoading description={t('loading-text')}/>;

    if (all.error) return <EmptyStateUI title={t("nothing-found")}/>;

    const message = form?.errors[name]?.message ?? `Invalid value for the ${name}`;

    const prop: string = objectProperty ?? 'name';

    // @ts-ignore
    if (more) {
        (data[more] as any ?? []).map((item: any) => {
            reversed.set(item['id'], item[prop]);
        })
    } else {
        for (let [key, value] of data) {
            reversed.set(key, value[prop]);
        }
    }

    const values = Array.from(reversed.keys());

    return <ComboBox
        ariaLabel="ComboBox"
        id={uuidv4()}
        invalidText={message}
        invalid={form?.errors[name] !== undefined}
        name={name}
        items={values}
        itemToString={(item: any) => {
            const elt = (reversed.get(item));
            return elt;
        }}
        selectedItem={defaultValue as string}
        onChange={(async (picked) => {
            if (!picked || !picked.selectedItem) {
                form?.setError(name, message);
            } else {
                const value = picked.selectedItem;
                form?.setValue(name, value);
            }
        })}
        placeholder={placeholder ?? ''}
        titleText={labelText}
    />;
}


export default memo(FromControlObject);
