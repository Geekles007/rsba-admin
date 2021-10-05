import {memo, useEffect, useMemo} from "react";
import * as React from "react";
import {ComboBox, InlineLoading, MultiSelect} from "carbon-components-react";
import {useTranslation} from "react-i18next";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {InputProps} from "../../model/InputProps";
import {BaseProps} from "../../model/BaseProps";
import GenericQueryAll from "../../../generic-query-all";
import EmptyStateUI from "../../../empty-state";

const MultiSelector = <V extends BaseProps>({
                                                documentNode,
                                                name,
                                                labelText,
                                                placeholder,
                                                form,
                                                client,
                                                defaultValue,
                                                objectProperty
                                            }: InputProps<V>) => {

    const {t} = useTranslation('translation', {useSuspense: false})


    useEffect(() => console.debug('…'), [documentNode]);

    const reversed = useMemo(() => new Map<string, any>(), []);

    const {values: data, outcome: all} = GenericQueryAll({
        node: documentNode!,
        client: client
    });

    form?.register({name: name}, {required: true});

    if (all.loading) return <InlineLoading description={t('loading-text')}/>;

    if (all.error) return <EmptyStateUI title={t("nothing-found")}/>;

    const message = form?.errors[name]?.message ?? `Invalid value for the ${name}`;

    const prop: string = objectProperty ?? 'name';


    // @ts-ignore
    // for (let [key, value] of data) {
    //     reversed.set(value[prop], key);
    // }

    const values = Array.from(data.keys());

    return <MultiSelect.Filterable
        id={uuidv4()}
        invalidText={message}
        invalid={form?.errors[name] !== undefined}
        items={values}
        itemToString={(item: any) => {
            const elt = (data.get(item));
            return elt ? elt[prop] : "";
        }}
        initialSelectedItems={defaultValue as string[]}
        onChange={(picked) => {
            if (!picked || !picked.selectedItems) {
                form?.setError(name, message);
            } else {
                form?.setValue(name, picked.selectedItems);
            }
        }}
        placeholder={placeholder ?? ''}
        titleText={labelText}
    />;
}


export default memo(MultiSelector);
