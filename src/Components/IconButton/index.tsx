import clsx from "clsx";
import Button, { type IButtonProps } from "../Button";
import { type FC } from "react";
import styles from "./index.module.scss";

export interface IconButtonProps extends IButtonProps {
    icon: string | JSX.Element;
    iconCls?: IButtonProps["className"];
    outlined?: boolean;
}

const IconButton: FC<IconButtonProps> = (props) => {
    const { icon, iconCls, className, outlined, ...buttonProps } = props;
    return (
        <Button {...buttonProps} className={clsx(styles.icon_button, className)} type="button">
            <span className={clsx(outlined ? "material-icons-outlined" : "material-icons", styles.icon, iconCls)}>{icon}</span>
        </Button>
    );
};

export default IconButton;
