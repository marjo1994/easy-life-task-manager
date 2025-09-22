export const LoadingState = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="bg-primary-100 absolute h-12 w-12 animate-ping rounded-full opacity-20"></div>
        <div className="bg-primary-200 absolute h-8 w-8 animate-ping rounded-full opacity-30 delay-300"></div>
        <div className="bg-primary-300 absolute h-5 w-5 animate-ping rounded-full opacity-40 delay-700"></div>
        <div className="bg-primary-300 h-2 w-2 rounded-full"></div>
      </div>
    </div>
  );
};
