import Image from 'next/image'
import AppContext from '@/Contexts/AppContext';
import { RouterProvider } from 'react-router-dom';
import NavBar from '@/Components/Navbar';
import { useContext } from 'react';
import { AppDataContext } from '@/Contexts/AppData';
import useFetchData from '@/hooks/useFetchData';


export default function Home() {
  const data = useFetchData();

  return (
      <div>
          <div>Welcome to Network Manager</div>
      </div>
  );
}
