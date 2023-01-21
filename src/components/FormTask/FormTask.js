export default function FormTask({ Title, isEdit, onClose }) {
  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold text-[#1D1F20]'>{Title}</h1>
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
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M6 6L18 18'
              stroke='#404040'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </span>
      </div>
      <div className='flex flex-col mt-4'>
        <label htmlFor='' className='text-xs font-bold text-[#404040]'>
          Task Name
        </label>
        <input
          type='text'
          className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
          placeholder='Type your Task'
        />
      </div>

      <div className='flex flex-col mt-5'>
        <label htmlFor='' className='text-xs font-bold'>
          Progress
        </label>
        <input
          type='text'
          className='w-1/3 px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
          placeholder='70%'
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
    </div>
  );
}
