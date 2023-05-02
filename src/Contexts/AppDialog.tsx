import React, { type FC, useState, type PropsWithChildren } from "react";
import Dialog, { type DialogProps } from "../Components/Dialog";

export type DialogOptionProps = Omit<DialogProps, "open" | "onClose"> & { fullScreen?: boolean };

interface IAppDialogContextProps {
    open: boolean;
    showDialog: (content: React.ReactNode, dialogProps?: DialogOptionProps, fullScreen?: boolean) => void;
    hideDialog: () => void;
    content?: React.ReactNode;
}

export const AppDialogContext = React.createContext<IAppDialogContextProps>({
    open: false,
    showDialog() {
        // TODO
    },
    hideDialog() {
        // TODO
    },
});

export const useAppDialog = (): IAppDialogContextProps => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dialogProps, setDialogProps] = useState<DialogOptionProps>();
    const [content, setContent] = useState<React.ReactNode>();

    const showDialog = (content: React.ReactNode, dialogProps?: DialogOptionProps) => {
        setIsOpen(true);
        setDialogProps(dialogProps);
        setContent(content);
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    };

    const hideDialog = () => {
        setIsOpen(false);
        setDialogProps(undefined);
        setContent(undefined);
        document.getElementsByTagName("body")[0].style.overflow = "unset";
    };

    return {
        showDialog,
        hideDialog,
        open: isOpen,
        content,
    };
};

export const AppDialogProvider: FC<PropsWithChildren> = ({ children }) => {
    const { showDialog, hideDialog, open, content } = useAppDialog();
    return (
        <AppDialogContext.Provider
            value={{
                showDialog,
                hideDialog,
                open,
            }}>
            {children}
            <Dialog open={open} onClose={hideDialog}>
                {content}
            </Dialog>
        </AppDialogContext.Provider>
    );
};

export default AppDialogProvider;
