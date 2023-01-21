import axios from 'axios';
import config from './../../config';

export default function FormGroup({ onClose, Auth }) {
  const handleSubmit = e => {
    e.preventDefault();

    const body = {
      title: e.target.titleGroup.value,
      description: e.target.descriptionGroup.value,
    };

    axios
      .post(`${config.services.baseUrl}/todos`, body, {
        headers: {
          Authorization: `${Auth}`,
        },
      })
      .then(res => {
        console.log(res);
        alert('post todo success!');
        router.reload(window.location.pathname);
      })
      .catch(err => {
        console.log(err);
        alert('error post todo!');
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-lg font-bold text-[#1D1F20]'>Add New Group</h1>

      <form onSubmit={handleSubmit} method='post'>
        <div className='flex flex-col mt-4'>
          <label htmlFor='' className='text-xs font-normal'>
            Title
          </label>
          <input
            type='text'
            name='titleGroup'
            className='px-4 py-2 border-2 border-[#E0E0E0] text-sm font-normal outline-none rounded-lg mt-2 -ml-1'
            placeholder='Placeholder'
          />
        </div>

        <div className='flex flex-col mt-5'>
          <label htmlFor='' className='text-xs font-normal'>
            Description
          </label>
          <textarea
            name='descriptionGroup'
            rows='5'
            className='px-4 py-2 text-sm font-normal border-2 border-[#E0E0E0] outline-none rounded-lg mt-2 -ml-1'
            placeholder='Placeholder'
          ></textarea>
        </div>

        <div className='flex justify-end pt-8'>
          <button
            className='border-2 border-[#E0E0E0] text-sm font-bold text-[#1D1F20] px-4 py-2 mr-2.5 bg-white rounded-lg'
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button className='text-sm font-bold text-white px-4 py-2 bg-[#01959F] rounded-lg'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
