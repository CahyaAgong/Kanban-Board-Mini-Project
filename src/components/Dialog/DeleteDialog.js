export default function DeleteDialog({ onClose, onDelete }) {
  return (
    <div className='flex flex-col p-6'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <span className='mr-2'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z'
                stroke='#E11428'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
          <h1 className='text-lg font-bold text-black'>Delete Task</h1>
        </div>

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

      <p className='mt-4 text-sm font-normal leading-6'>
        Are you sure want to delete this task? your action can’t be reverted.
      </p>

      <div className='flex justify-end py-4'>
        <button
          className='border-2 border-[#E0E0E0] text-sm font-bold text-[#1D1F20] px-4 py-2 mr-2.5 bg-white rounded-lg'
          onClick={() => onClose()}
        >
          Cancel
        </button>
        <button
          className='text-sm font-bold text-white px-4 py-2 bg-[#E11428] rounded-lg'
          onClick={() => onDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
