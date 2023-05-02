import DatePicker from '@/Components/DatePicker';
import NavBar from '@/Components/Navbar';
import AppContext from '@/Contexts/AppContext'
import '@/styles/index.scss'
import { ColorModeContext, useMode } from "@/theme";
import { ThemeProvider } from '@mui/material';
import axios from 'axios';
import type { AppProps } from 'next/app'
import { useContext, useEffect, useState } from 'react';
import { InputData, NetworkRecords, filteredNetworkData } from './types';
import dayjs from 'dayjs';
import { AppDataContext } from '@/Contexts/AppData';
import _ from 'lodash';

export default function App({ Component, pageProps }: AppProps) {
    const [theme, colorMode] = useMode();
    
  return (
      <AppContext>
          <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                  <div className='bg-primary-blue min-h-screen'>
                      <NavBar />
                      <div className='pt-[6rem] px-[4rem]'>
                          <DatePicker />
                          <Component {...pageProps} />
                      </div>
                  </div>
              </ThemeProvider>
          </ColorModeContext.Provider>
      </AppContext>
  );
}
