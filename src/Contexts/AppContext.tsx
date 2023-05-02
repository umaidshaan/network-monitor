import React, { type FC, type PropsWithChildren } from "react";
import AppDialogProvider from "./AppDialog";
import AppDataProvider from "./AppData";

const AppContext: FC<PropsWithChildren> = ({ children }) => {
    return <AppDialogProvider>
        <AppDataProvider>{children}</AppDataProvider>
    </AppDialogProvider>;
};

export default AppContext;
