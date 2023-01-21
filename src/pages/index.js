import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import { Inter } from '@next/font/google';
import Modal from '../components/Modal';
import FormGroup from './../components/FormGroup';
import GroupCard from './../components/GroupCard';
import Auth from './../components/Auth';

import config from './../config.js';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const [showModalCreateGroup, setShowModalCreateGroup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showModalCreateTask, setShowModalCreateTask] = useState('');

  const [auth, setAuth] = useState('null');
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token !== null && token !== 'null') {
      setAuth(token);
    }

    if (auth !== null && auth !== 'null') {
      async function getTodoList() {
        await axios
          .get(`${config.services.baseUrl}/todos`, {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          })
          .then(res => {
            setTodoList(res.data);
          })
          .catch(err => {
            alert('error occured! ', err);
          });
      }

      getTodoList();
    }
  }, [auth]);

  const logout = () => {
    if (confirm('you sure?')) {
      window.localStorage.setItem('token', null);
      router.reload(window.location.pathname);
    }
  };

  return (
    <>
      <Head>
        <title>Kanban Board</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='h-screen flex flex-col font-NunitoSans'>
        <div className='flex-shrink-0 min-w-0 bg-white'>
          <div className='border-b-2 border-gray-200'>
            <header className='flex items-center space-x-5 p-6'>
              <h1 className='text-lg font-semibold text-black'>
                Product Roadmap
              </h1>

              <button
                className='bg-[#01959F] flex items-center px-3 py-2 text-white text-sm font-medium rounded-lg'
                onClick={() =>
                  auth !== 'null'
                    ? setShowModalCreateGroup(true)
                    : alert('you should login first to access!')
                }
              >
                <span className='mr-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6v12m6-6H6'
                    />
                  </svg>
                </span>
                Add New Group
              </button>

              <button
                className={
                  auth === 'null'
                    ? 'bg-[#01959F] flex items-center px-3 py-2 text-white text-sm font-medium rounded-lg'
                    : 'hidden'
                }
                onClick={() => setShowAuth(true)}
              >
                <span className='mr-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </span>
                Signin & Signup
              </button>

              <button
                className={
                  auth !== 'null'
                    ? 'bg-[#E11428] flex items-center px-3 py-2 text-white text-sm font-medium rounded-lg'
                    : 'hidden'
                }
                onClick={() => logout()}
              >
                <span className='mr-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                    />
                  </svg>
                </span>
                Logout
              </button>
            </header>
          </div>
        </div>

        <div className='flex-1 overflow-auto'>
          <main className='p-6 flex'>
            {todoList !== null ? (
              todoList.map((todo, idx) => (
                <GroupCard
                  key={todo.id}
                  todo={todo}
                  showModal={showModalCreateTask}
                  setShowModal={setShowModalCreateTask}
                  authToken={auth}
                  index={idx}
                  todoListTotal={todoList.length}
                />
              ))
            ) : (
              <div className='flex w-full h-32 bg-gray-300'>No Data!</div>
            )}
          </main>
        </div>
      </div>
      <Modal isVisible={showModalCreateGroup}>
        <FormGroup
          onClose={() => {
            setShowModalCreateGroup(false);
          }}
          Auth={auth}
        />
      </Modal>

      <Modal isVisible={showAuth}>
        <Auth
          authToken={auth}
          setAuthToken={setAuth}
          onClose={() => {
            setShowAuth(false);
          }}
        />
      </Modal>
    </>
  );
}
