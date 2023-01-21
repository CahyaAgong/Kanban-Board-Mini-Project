import { useState } from 'react';
import { useRouter } from 'next/router.js';
import ProgressBar from './../ProgressTask';
import Modal from './../Modal';
import Delete from './../Dialog';
import FormTask from '../FormTask/FormTask';
import axios from 'axios';
import config from './../../config.js';

export default function TaskCard({ taskItem, authToken, index, totalGroup }) {
  const router = useRouter();
  const [showSetting, setShowSetting] = useState(false);
  const [showModal, setShowModal] = useState('');

  const handleDelete = () => {
    axios
      .delete(
        `${config.services.baseUrl}/todos/${taskItem.todo_id}/items/${taskItem.id}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      )
      .then(res => {
        setShowModal('');
        router.reload(window.location.pathname);
      })
      .catch(err => {
        alert('error occured! ', err);
      });
  };

  const moveTask = async direction => {
    let body;
    if (direction === 'left') {
      body = {
        target_todo_id: taskItem.todo_id - 1,
      };
    } else {
      body = {
        target_todo_id: taskItem.todo_id + 1,
      };
    }

    axios
      .patch(
        `${config.services.baseUrl}/todos/${taskItem.todo_id}/items/${taskItem.id}`,
        body,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      )
      .then(res => {
        if (direction === 'left') {
          alert('task is moved to left!');
        } else {
          alert('task is moved to right!');
        }
        router.reload(window.location.pathname);
      })
      .catch(err => {
        alert('error post todo!', err);
      });
  };

  const handleMove = direction => {
    if (direction === 'left') {
      if (index - 1 < 0) {
        alert('This task cant move to left!');
        return;
      }
      moveTask(direction);
    } else {
      if (index + 1 > totalGroup - 1) {
        alert('This task cant move to right!');
        return;
      }
      moveTask(direction);
    }
  };

  return (
    <div className='p-4 bg-[#FAFAFA] border border-[#E0E0E0] rounded-sm shadow cursor-pointer'>
      <p className='text-sm font-bold text-[#404040] leading-6 border-b-2 border-dotted border-gray-200 pb-2'>
        {taskItem.name}
      </p>
      <div className='mt-3 flex justify-between'>
        <div className='w-4/5 flex items-center'>
          <ProgressBar progressPercentage={taskItem.progress_percentage} />
          <span className='ml-3 text-xs font-normal text-[#757575]'>
            {taskItem.progress_percentage < 100 ? (
              `${taskItem.progress_percentage}%`
            ) : (
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_4_931)'>
                  <path
                    d='M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z'
                    fill='#43936C'
                  />
                  <path
                    d='M5.6001 7.89085L7.2001 9.49086L10.2911 6.3999'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_4_931'>
                    <rect
                      width='16'
                      height='16'
                      fill='white'
                      transform='translate(0 16) rotate(-90)'
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </span>
        </div>
        <span
          className='cursor-pointer relative'
          onClick={() => setShowSetting(!showSetting)}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z'
              stroke='#757575'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
              stroke='#757575'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z'
              stroke='#757575'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <div
            className={
              showSetting
                ? 'z-10 absolute block bg-white rounded-md shadow-md w-80'
                : 'hidden'
            }
          >
            <ul className='text-sm font-semibold text-[#333333]'>
              <li
                className='flex items-center px-5 pt-4 pb-3 group'
                onClick={() => {
                  handleMove('right');
                }}
              >
                <span className='mr-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='currentColor'
                    className='w-5 h-5 group-hover:text-[#01959F]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
                    />
                  </svg>
                </span>
                <a href='#' className='block group-hover:text-[#01959F]'>
                  Move Right
                </a>
              </li>

              <li
                className='flex items-center px-5 py-3 group'
                onClick={() => {
                  handleMove('left');
                }}
              >
                <span className='mr-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='currentColor'
                    className='w-5 h-5 group-hover:text-[#01959F]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75'
                    />
                  </svg>
                </span>
                <a href='#' className='block group-hover:text-[#01959F]'>
                  Move Left
                </a>
              </li>

              <li
                className='flex items-center px-5 py-3 group'
                onClick={() => setShowModal(`taskEdit${taskItem.id}`)}
              >
                <span className='mr-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='currentColor'
                    className='w-5 h-5 group-hover:text-[#01959F]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                    />
                  </svg>
                </span>

                <a href='#' className='block group-hover:text-[#01959F]'>
                  Edit
                </a>
              </li>

              <li
                className='flex items-center px-5 pt-3 pb-4 group'
                onClick={() => setShowModal(`taskDelete${taskItem.id}`)}
              >
                <span className='mr-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 group-hover:text-[#01959F]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </span>
                <a href='#' className='block group-hover:text-[#01959F]'>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </span>
      </div>
      <Modal isVisible={showModal === `taskDelete${taskItem.id}`}>
        <Delete
          onClose={() => setShowModal('')}
          onDelete={() => handleDelete()}
        />
      </Modal>

      <Modal isVisible={showModal === `taskEdit${taskItem.id}`}>
        <FormTask
          taskItem={taskItem}
          isEdit={true}
          onClose={() => {
            setShowModal(``);
          }}
          authToken={authToken}
        />
      </Modal>
    </div>
  );
}
