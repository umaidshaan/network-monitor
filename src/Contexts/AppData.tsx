import React, { type FC, useState, type PropsWithChildren, useMemo, useEffect } from "react";
import Dialog, { type DialogProps } from "../Components/Dialog";
import { filteredNetworkData } from "@/pages/types";
import utils from "@/utils";

export type DialogOptionProps = Omit<DialogProps, "open" | "onClose"> & {
    fullScreen?: boolean;
};

interface IAppDataContextProps {
    data: filteredNetworkData;
    setData: (data: filteredNetworkData) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuth: boolean) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AppDataContext = React.createContext<IAppDataContextProps>({
    data: {
        students: {},
    },
    setData() {
        // TODO
    },
    isAuthenticated: false,
    setIsAuthenticated() {
        // TODO
    },
    login() {

    },
    logout() {
        
    }
});


export const AppDataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<filteredNetworkData>({
        students: {},
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        console.log(utils.getCookie("isAuthenticated"));
        console.log(utils.getCookie("isAuthenticated") === "true");
        setIsAuthenticated(utils.getCookie("isAuthenticated") === "true");
    }, [])
    

    const login = async (email: string, password: string) => {
        // if (
        //     email === process.env.ADMIN_USERNAME &&
        //     password === process.env.ADMIN_PASSWORD
        // ) {
        
        if (
            email === "admin" &&
            password === "admin"
        ) {
            utils.setCookie("isAuthenticated", "true");
            setIsAuthenticated(true);
            return {
                success: true,
                msg: "auth done",
            };
        }

        return { success: false, msg: "incorrect email or password" };
    };

    const logout = async () => {
        utils.setCookie("isAuthenticated", "false");
        setIsAuthenticated(false);
    };

    const memoedValue = useMemo(() => {
        return {
            data,
            setData: (dd: filteredNetworkData) => {
                setData(dd);
            },
            isAuthenticated,
            setIsAuthenticated,
            login,
            logout,
        };
    }, [data, setData, isAuthenticated, setIsAuthenticated]);

    return (
        <AppDataContext.Provider value={memoedValue}>
            {children}
        </AppDataContext.Provider>
    );
};

export default AppDataProvider;
