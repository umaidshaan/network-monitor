import React, { useContext, type FC, useState, useEffect } from "react";
import Button from "../Button";
import { generatePath, useNavigate } from "react-router-dom";
import Hamburger from "../../Icons/Hamburger";
import styles from "./navbar.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRouter } from "next/router"
import Logo from '../../Icons/logo.png';
import Image from "next/image";
import { AppDataContext } from "@/Contexts/AppData";
import CustomDatePicker from "../DatePicker";
import useFetchData from "@/hooks/useFetchData";

const routes = [
    {
        title: "Home",
        location: "/",
    },
    {
        title: "Bar",
        location: "/bar",
    },
    {
        title: "Pie",
        location: "/pie",
    },
];

const NavBar: FC = () => {
    // const { isDeviceSm, isDeviceXs } = useMediaQuery();
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout, selectedDate } = useContext(AppDataContext);
    const data = useFetchData();
    
    
    const router = useRouter();
    // const handleLogout = () => {
    //     setIsMenuOpen(false);
    //     // navigate(routes.HOME);
    // };

    return (
        <div
            className={`flex justify-between items-center px-[4rem] fixed z-[2] bg-[#353535] text-gray-100 flex-row h-[5rem] w-full ${styles.bottomShadow}`}>
            <div className='flex items-center gap-[3rem]'>
                <Button link={"/"}>
                    <Image
                        src={Logo}
                        alt='logo'
                        className='w-auto h-[2.8rem]'
                    />
                </Button>
                <>
                    {routes.map((paths) => {
                        return (
                            <Button
                                link={paths.location}
                                key={paths.title}
                                className='uppercase'>
                                {paths.title}
                            </Button>
                        );
                    })}
                </>
            </div>
            <div className="flex items-center gap-[2rem]">
                <CustomDatePicker />
                <Button onClick={() => logout()} className='uppercase'>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default NavBar;
