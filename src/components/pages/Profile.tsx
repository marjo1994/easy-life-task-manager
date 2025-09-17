import { useProfile } from "../../hooks/useProfile";

export const Profile = () => {
  const { profile, loading, error } = useProfile();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="flex h-full justify-center p-4 lg:items-center">
      <div className="w-full max-w-md rounded-2xl bg-neutral-300 p-8 shadow-lg">
        <div className="bg-primary-300 mb-3 px-6 py-2">
          <h2 className="text-body-xl text-center font-bold text-neutral-50">
            Profile
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-body-s text-neutral-100">Full Name</p>
            <p className="text-body-m font-medium text-neutral-50">
              {profile.fullName}
            </p>
          </div>
          <div>
            <p className="text-body-s text-neutral-100">Email</p>
            <p className="text-body-m font-medium text-neutral-50">
              {profile.email}
            </p>
          </div>
          <div>
            <p className="text-body-s text-gray-500">Type</p>
            <p className="text-body-m font-medium text-neutral-50">
              {profile.type}
            </p>
          </div>
          <div>
            <p className="text-body-s text-gray-500">Created At</p>
            <p className="text-body-m font-medium text-neutral-50">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-body-s text-gray-500">Updated At</p>
            <p className="text-body-m font-medium text-neutral-50">
              {new Date(profile.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
