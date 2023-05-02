import React, { type FC } from "react";
import { type CommonIconProps } from "./types";

export interface CloseIconProps extends CommonIconProps {}

const CloseIcon: FC<CloseIconProps> = ({ className, size }) => {
    return (
        <svg className={className} width={size ?? 22} height={size ?? 22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L1 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 21L21 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default CloseIcon;
