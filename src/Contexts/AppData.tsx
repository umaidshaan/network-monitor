import React, { type FC, useState, type PropsWithChildren, useMemo } from "react";
import Dialog, { type DialogProps } from "../Components/Dialog";
import { filteredNetworkData } from "@/pages/types";

export type DialogOptionProps = Omit<DialogProps, "open" | "onClose"> & {
    fullScreen?: boolean;
};

interface IAppDataContextProps {
    data: filteredNetworkData;
    setData: (data: filteredNetworkData) => void;
}

export const AppDataContext = React.createContext<IAppDataContextProps>({
    data: {
        students: {}
    },
    setData() {
        // TODO
    },
});


export const AppDataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<filteredNetworkData>({
        students: {},
    });

    const memoedValue = useMemo(() => {
        return {
            data,
            setData: (dd) => {
                setData(dd);
            },
        };
    }, [data, setData]);

    return (
        <AppDataContext.Provider
            value={{
                data,
                setData: (dd) => {
                    setData(dd);
                },
            }}>
            {children}
        </AppDataContext.Provider>
    );
};

export default AppDataProvider;
