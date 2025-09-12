import fileIcon from "../../assets/file-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";
import threeDots from "../../assets/three-dots.svg";
import avatar from "../../assets/avatar.png";
import type { GetTasksQuery } from "../../__generated__/graphql";
import { formatDate } from "../../utils/utils";

type Task = GetTasksQuery["tasks"][number];

type CardProps = {
  task: Task;
};
export const Card = ({ task }: CardProps) => {
  return (
    <div className="rounded-xl bg-neutral-200 p-3 text-neutral-50">
      <div className="mb-3 flex justify-between">
        <span className="">{task.name}</span>
        <img src={threeDots} alt="three dots" />
      </div>
      <div className="mb-4 flex justify-between">
        <span>{Number(task.pointEstimate)}</span>
        <div>{formatDate(task.dueDate)}</div>
      </div>
      <div className="mb-4 flex gap-2">
        {task.tags.map((tag) => (
          <span key={tag} className="rounded bg-neutral-100 px-4 py-1">
            {tag}
          </span>
        ))}
      </div>
      <div className="mb-2 flex justify-between">
        <img src={avatar} alt="profile"></img>
        <div className="flex flex-row items-center">
          <img src={fileIcon} alt="file" className="mr-4"></img>
          <span className="mr-1">5</span>
          <img src={fileIcon} alt="commits" className="mr-4"></img>
          <span className="mr-1">3</span>
          <img src={commentIcon} alt="comments"></img>
        </div>
      </div>
    </div>
  );
};
