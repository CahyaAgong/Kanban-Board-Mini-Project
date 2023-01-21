import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isVisible, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modal = isVisible ? (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[420px] flex flex-col'>
        <div className='bg-white p-2 rounded-xl'>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modal, document.getElementById('modal-root'));
  } else {
    return null;
  }
}
