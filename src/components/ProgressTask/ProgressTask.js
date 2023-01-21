const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className='h-4 w-full rounded-full bg-[#EDEDED]'>
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full rounded-full ${
          progressPercentage < 100 ? 'bg-[#01959F]' : 'bg-[#43936C]'
        }`}
      ></div>
    </div>
  );
};

export default ProgressBar;
