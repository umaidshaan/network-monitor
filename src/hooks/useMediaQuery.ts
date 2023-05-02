import { useEffect, useState } from "react";

// Same as set in tailwind.config.cjs
const sm = 640;
const md = 768;
const lg = 1024;
const xl = 1280;

const useMediaQuery = () => {
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window ? window?.innerWidth : 0);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        isDeviceXl: width >= xl,
        isDeviceLg: width < xl && width >= lg,
        isDeviceMd: width < lg && width >= md,
        isDeviceSm: width > sm && width < md,
        isDeviceXs: width <= sm,
    };
};

export default useMediaQuery;
