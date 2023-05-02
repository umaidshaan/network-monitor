import IconButton from '../IconButton';
import { type PropsWithChildren } from "react";
import styles from "./index.module.scss";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    heading?: string;
}

const Dialog = (props: PropsWithChildren<DialogProps>) => {
    const { open, onClose, children, heading } = props;
    if (!open) return null;
    return (
        <div className={styles.modal}>
            <div className={styles.modal_wrapper}>
                <div className={styles.modal_backdrop} />
                <div className={styles.modal_container}>
                    <div className="flex justify-between w-full items-center">
                        <div className="flex-grow">
                            <h1 className="text-2xl">{heading}</h1>
                        </div>
                        <IconButton className={styles.modal_button} onClick={onClose} icon="close" />
                    </div>
                    <div className={styles.modal_content}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
