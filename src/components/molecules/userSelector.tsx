import { ListBoxField } from "./ListBoxField";
import { useUsers } from "../../hooks/useUsers";
import assigneeicon from "../../assets/assignee-icon.svg";

export const UserSelector = () => {
  const { usersOptions, loading, error } = useUsers();
  if (error) {
    <div className="text-primary-300 text-body-s">Error Loading Users</div>;
  }

  if (loading) {
    return (
      <ListBoxField
        name="assigneeId"
        options={[{ value: "", label: "Assignee..." }]}
        icon={assigneeicon}
        disabled={true}
        avatar={true}
      />
    );
  }

  return (
    <ListBoxField
      name="assigneeId"
      options={[{ value: "", label: "Assignee" }, ...usersOptions]}
      icon={assigneeicon}
      avatar={true}
    />
  );
};
