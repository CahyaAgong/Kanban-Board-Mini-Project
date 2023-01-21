export default function Modal({ isVisible, children }) {
  if (!isVisible) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[420px] flex flex-col'>
        <div className='bg-white p-2 rounded-xl'>{children}</div>
      </div>
    </div>
  );
}
