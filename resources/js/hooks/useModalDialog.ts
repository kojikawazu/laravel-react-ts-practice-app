import { useState } from 'react';

const useModalDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = (additionalAction?: () => void) => {
        setIsDialogOpen(true);
        if (additionalAction) {
            additionalAction();
        }
    };

    const closeDialog = (additionalAction?: () => void) => {
        setIsDialogOpen(false);
        if (additionalAction) {
            additionalAction();
        }
    };

    return {
        isDialogOpen,
        openDialog,
        closeDialog,
    };
};

export default useModalDialog;
