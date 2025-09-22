export const ErrorFallback = ({ error }: any) => {
  return (
    <div className="text-primary-300 mx-4 mt-3 rounded-lg bg-neutral-50 p-4">
      <p className="font-semibold">Something went wrong:</p>
      <p>{error.message}</p>
    </div>
  );
};
