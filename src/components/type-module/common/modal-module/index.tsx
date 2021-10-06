import React, {memo} from "react";
import {inject, observer} from "mobx-react";
import DialogStore from "../../../type-module/stores/DialogStore";
import {ComposedModal, ModalHeader} from "carbon-components-react";
import { ModalContainer } from "./modal-style/default";
import {useTranslation} from "react-i18next";

const ModalUI = observer(() => {

    const {t} = useTranslation("translation", {useSuspense: false});

    const closeModal = () => {
        DialogStore.setOpen(false);
        DialogStore.clear();
    }

    return (
        <ModalContainer>
            <ComposedModal size={DialogStore.options.size} open={DialogStore.open} onClose={closeModal}>
                <ModalHeader
                    label={t(DialogStore.options?.title as string)}/>
                {DialogStore.options.content}
            </ComposedModal>
        </ModalContainer>
    );
})

export default inject("DialogStore")(memo(ModalUI));
