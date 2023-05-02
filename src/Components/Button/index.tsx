import clsx from "clsx";
import React, { type FC, type PropsWithChildren, useMemo } from "react";
import styles from "./index.module.scss";
import Link from "next/link";

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    link?: string;
    onClick?: () => void;
    className?: string;
}

const Button: FC<PropsWithChildren<IButtonProps>> = (props) => {

    const { onClick, className, link, children} = props;

    if (link)
        return (
            <Link href={link} className={className}>
                {children}
            </Link>
        );
    
    if (onClick)
        return (
            <button onClick={onClick} className={className}>
                {children}
            </button>
        );
    
    return <></>
};

export default Button;
