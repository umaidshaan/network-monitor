import { AppDataContext } from '@/Contexts/AppData';
import { NextComponentType, NextPageContext } from 'next';
import React, { useContext, useState } from 'react'

const Auth = ({
    children,
}: {
    children: React.ReactElement;
}) => {
    const { isAuthenticated, login } = useContext(AppDataContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await login(username, password);
    };

    if (!isAuthenticated)
        return (
            <div className='relative flex h-full w-full'>
                <div className='h-screen w-1/2 bg-primary-blue'>
                    <div className='mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2'>
                        <div className='mt-10'>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div>
                                    <label className='mb-2.5 block font-bold'>
                                        Username
                                    </label>
                                    <input
                                        type='username'
                                        id='username'
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        className='inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30'
                                    />
                                </div>
                                <div className='mt-4'>
                                    <label className='mb-2.5 block font-bold'>
                                        Password
                                    </label>
                                    <input
                                        type='password'
                                        id='email'
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        className='inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow'
                                    />
                                </div>
                                <div className='my-10'>
                                    <button className='w-full rounded-full bg-orange-600 p-5 hover:bg-orange-800'>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='h-screen w-1/2 bg-primary-blue'>
                    <img
                        src='https://images.pexels.com/photos/2523959/pexels-photo-2523959.jpeg'
                        className='h-full w-full'
                    />
                </div>
            </div>
        );

    return <>{children}</>;
};

export default Auth