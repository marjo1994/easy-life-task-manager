import { Card } from "../molecules/Card";

export const Dashboard = () => {
  return (
    <div className="mt-4 flex-1 overflow-auto">
      <div className="flex min-w-max gap-6 px-0 md:grid md:grid-cols-3">
        <div className="w-60 flex-shrink-0 xl:w-87">
          <h2 className="mb-4 text-neutral-50">Working (03)</h2>
          <div className="flex flex-col gap-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="w-60 flex-shrink-0 xl:w-87">
          <h2 className="mb-4 text-neutral-50">In Progress (03)</h2>
          <div className="flex flex-col gap-4">{/* cards */}</div>
        </div>
        <div className="w-60 flex-shrink-0 xl:w-87">
          <h2 className="mb-4 text-neutral-50">Completed (03)</h2>
          <div className="flex flex-col gap-4">{/* cards */}</div>
        </div>
      </div>
    </div>
  );
};
