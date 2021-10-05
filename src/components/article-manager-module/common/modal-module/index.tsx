import React, {memo} from "react";
import {inject, observer} from "mobx-react";
import {ComposedModal, ModalHeader} from "carbon-components-react";
import { ModalContainer } from "./modal-style/default";
import DialogStore from "../../stores/DialogStore";

const ModalUI = observer(() => {

    const closeModal = () => {
        DialogStore.setOpen(false);
        DialogStore.clear();
    }

    return (
        <ModalContainer>
            <ComposedModal size={DialogStore.options.size} open={DialogStore.open} onClose={closeModal}>
                <ModalHeader
                    label={DialogStore.options?.title}/>
                {DialogStore.options.content}
            </ComposedModal>
        </ModalContainer>
    );
})

export default inject("DialogStore")(memo(ModalUI));
