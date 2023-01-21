import { useEffect, useState } from 'react';
import { useRouter } from 'next/router.js';
import axios from 'axios';
import config from './../../config.js';

export default function FormTask({ taskItem, isEdit, onClose, authToken }) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [percentageProgress, setPercentageProgress] = useState('');

  const getDetailTask = async () => {
    await axios
      .get(
        `${config.services.baseUrl}/todos/${taskItem.todo_id}/items/${taskItem.id}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      )
      .then(res => {
        setName(res.data.name);
        setPercentageProgress(res.data.progress_percentage);
      })
      .catch(err => {});
  };

  useEffect(() => {
    if (isEdit) {
      getDetailTask();
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isEdit) {
      const body = {
        name: e.target.taskName.value,
        progress_percentage: e.target.percentProgress.value,
      };

      axios
        .post(`${config.services.baseUrl}/todos/${taskItem.id}/items`, body, {
          headers: {
            Authorization: `${authToken}`,
          },
        })
        .then(res => {
          alert('post task success!');
          router.reload(window.location.pathname);
        })
        .catch(err => {
          alert('error post todo!');
        });

      return;
    }

    const body = {
      target_todo_id: taskItem.todo_id,
      name: name,
      percentageProgress: percentageProgress,
    };

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
        alert('update task success!');
        router.reload(window.location.pathname);
      })
      .catch(err => {
        alert('error post todo!');
      });
  };

  const handleChange = (e, input) => {
    setName(e.target.value);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold text-[#1D1F20]'>
          {isEdit ? 'Edit Task' : 'Create Task'}
        </h1>
        <span onClick={() => onClose()} className='cursor-pointer p-0'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18 6L6 18'
              stroke='#404040'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M6 6L18 18'
              stroke='#404040'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      </div>

      <form onSubmit={handleSubmit} method='post'>
        <div className='flex flex-col mt-4'>
          <label htmlFor='' className='text-xs font-bold text-[#404040]'>
            Task Name
          </label>
          <input
            type='text'
            name='taskName'
            className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='Type your Task'
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='flex flex-col mt-5'>
          <label htmlFor='' className='text-xs font-bold'>
            Progress (%)
          </label>
          <input
            type='text'
            name='percentProgress'
            className='w-1/3 px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='70'
            value={percentageProgress}
            onChange={e => setPercentageProgress(e.target.value)}
            required
          />
        </div>

        <div className='flex justify-end py-6'>
          <button
            className='border-2 border-[#E0E0E0] text-sm font-bold text-[#1D1F20] px-4 py-2 mr-2.5 bg-white rounded-lg'
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button className='text-sm font-bold text-white px-4 py-2 bg-[#01959F] rounded-lg'>
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}
