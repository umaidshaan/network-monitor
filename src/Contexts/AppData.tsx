import React, { type FC, useState, type PropsWithChildren, useMemo, useEffect } from "react";
import Dialog, { type DialogProps } from "../Components/Dialog";
import { filteredNetworkData } from "@/pages/types";
import utils from "@/utils";
import moment from "moment";
import { useRouter } from "next/router";

export type DialogOptionProps = Omit<DialogProps, "open" | "onClose"> & {
    fullScreen?: boolean;
};

interface IAppDataContextProps {
    data: filteredNetworkData;
    setData: (data: filteredNetworkData) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuth: boolean) => void;
    login: (email: string, password: string) => void;
    loginByLDAP: () => void;
    logout: () => void;
    selectedDate: string;
    setDate: (date: string) => void;
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
    login() {},
    loginByLDAP() {},
    logout() {},
    selectedDate: moment().format("YYYY-MM-DD"),
    setDate() {},
});


export const AppDataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<filteredNetworkData>({
        students: {},
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [selectedDate, setDate] = useState(moment().format("YYYY-MM-DD"));

    useEffect(() => {
        console.log("isAuthenticated", isAuthenticated);
        const url = new URL(window.location.href);
        if (url.searchParams.get("access_token")) {
            const token = url.searchParams.get("access_token");
            if (token) {
                sessionStorage.setItem("nm_auth_token", token);
                router.push("/");
                setIsAuthenticated(true);
            }
        }
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem("nm_auth_token")) {
          setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [])
    

    const router = useRouter();

    const loginByLDAP = async () => {        
        const auth_service_link = "http://auth.intranet.iiitr.ac.in"
        
        const url = new URL(window.location.href);
        router.push(
            `${auth_service_link}?redirect_url=${window.location.href}`
        );
    };

    const login = (email: string, password: string) => {
        if (email === "admin" && password === "admin") {
            sessionStorage.setItem("nm_auth_token", "true");
            setIsAuthenticated(true);
            return {
                success: true,
                msg: "auth done",
            };
        }

        return { success: false, msg: "incorrect email or password" };
    }

    const logout = async () => {
        // utils.setCookie("isAuthenticated", "false");
        // setIsAuthenticated(false);
        sessionStorage.removeItem("nm_auth_token");
        setIsAuthenticated(false);
        router.push("/");
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
            loginByLDAP,
            logout,
            selectedDate,
            setDate,
        };
    }, [
        data,
        setData,
        isAuthenticated,
        setIsAuthenticated,
        selectedDate,
        setDate,
    ]);

    return (
        <AppDataContext.Provider value={memoedValue}>
            {children}
        </AppDataContext.Provider>
    );
};

export default AppDataProvider;
