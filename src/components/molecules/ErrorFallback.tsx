export const ErrorFallback = ({ error }: any) => {
  return (
    <div role="alert" className="w-full rounded-lg bg-red-100 p-4 text-red-700">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};
