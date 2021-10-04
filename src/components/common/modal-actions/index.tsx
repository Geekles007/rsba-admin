import {Button, InlineLoading} from "carbon-components-react";
// @ts-ignore
import {ISuccess} from "core/ISuccess";
import * as React from 'react';
import {useTranslation} from "react-i18next";
import {memo} from "react";

interface ModalActionsUIProps {
    reset: () => void;
    loading: boolean;
    succeed: ISuccess;
}

const ModalActionsUI: React.FC<ModalActionsUIProps> = ({loading, reset, succeed}) => {
    const {t} = useTranslation('translation', {useSuspense: false})

    return (
        <>
            <Button
                kind="secondary"
                size={"field"}
                onClick={reset}
                disabled={loading}
                type="reset">
                {t("cancel-text")}
            </Button>
            {
                loading || succeed.state ?
                    <InlineLoading
                        style={{ marginLeft: '1rem' }}
                        description={loading ? t("loading-text") : t("saved-message")}
                        status={succeed.state ? 'finished' : 'active'}
                        aria-live={"polite"}
                    /> : (
                        <Button
                            kind="primary"
                            size={"field"}
                            type="submit">
                            {t("save-button-text")}
                        </Button>
                    )
            }
        </>
    );

}

export default memo(ModalActionsUI);
