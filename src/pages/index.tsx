import Image from 'next/image'
import AppContext from '@/Contexts/AppContext';
import { RouterProvider } from 'react-router-dom';
import NavBar from '@/Components/Navbar';
import { useContext } from 'react';
import { AppDataContext } from '@/Contexts/AppData';
import useFetchData from '@/hooks/useFetchData';
import DataTable, { TableCell } from '@/Components/Table';

const rows = [
    { id: 1, username: "Snow", data: "Jon", category: 35, dataUsed: 4 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Home() {
  const data = useFetchData();
  console.log("data", data);
  let staff: TableCell[] = [];
  let students: TableCell[] = [];

  if (!data?.staff || !data?.students) {
      return;
  }

  Object.values(data.staff).map((val, key) => {
    val.map((record, key2) => {
        staff.push({
            id: 0 ,
            username: record.username,
            date: record.acctstarttime,
            category: 'Staff',
            dataUsed: `${record.total_octates_used} GB`,
        });
      })
  });

  staff = staff.map((val, key) => {
    return {
      ...val,
      id: key + 1,
    }
  })

  Object.values(data.students).map((val) => {
      Object.keys(val).map((newVal) => {
          val[newVal].map((record, key2) => {
              students.push({
                  id: 0,
                  username: record.username,
                  date: record.acctstarttime,
                  category: newVal,
                  dataUsed: `${record.total_octates_used} GB`,
              });
          });
      });
  });

  students = students.map((val, key) => {
      return {
          ...val,
          id: key + 1,
      };
  });


  return (
      <div className='flex flex-col gap-[2rem] pb-[3rem]'>
          <div className='text-white text-2xl	flex justify-center items-center'>
              Welcome to Network Manager
          </div>

          <div className='flex flex-col gap-[1rem]'>
              <p className='text-white text-lg	flex'>Students Data: </p>
              <DataTable rows={students} />
          </div>
          <div className='flex flex-col gap-[1rem]'>
              <p className='text-white text-lg	flex'>Staff Data: </p>
              <DataTable rows={staff} />
          </div>
      </div>
  );
}
