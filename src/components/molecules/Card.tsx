import type { GetTasksQuery } from "../../__generated__/graphql";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { formatDate } from "../../utils/utils";
import { pointEstimateToNumber } from "../../utils/pointEstimateToNumber";
import { tagColors } from "../../utils/tagColors";
import fileIcon from "../../assets/file-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";
import threeDots from "../../assets/three-dots.svg";
import avatar from "../../assets/avatar.png";
import alarmIcon from "../../assets/alarm-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";

type Task = GetTasksQuery["tasks"][number];

type CardProps = {
  task: Task;
  onEditClick: () => void;
  onDeleteClick: () => void;
};
export const Card = ({ task, onEditClick, onDeleteClick }: CardProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    onEditClick();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDeleteClick();
  };
  return (
    <div className="rounded-xl bg-neutral-300 p-3 text-neutral-50">
      <div className="mb-3 flex justify-between">
        <span className="text-body-l font-normal xl:font-semibold">
          {task.name}
        </span>
        <Menu>
          <MenuButton>
            <img src={threeDots} alt="three dots" />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="rounded-lg border border-neutral-100 bg-neutral-200 p-2"
          >
            <MenuItem>
              <button
                className="flex flex-row items-center px-4 py-1.5 text-neutral-50"
                onClick={handleEdit}
              >
                <img src={editIcon} alt="edit icon" className="mr-3 h-5 w-5" />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                className="flex flex-row items-center px-4 py-1.5 text-neutral-50"
                onClick={handleDelete}
              >
                <img
                  src={deleteIcon}
                  alt="edit icon"
                  className="mr-3 h-5 w-5"
                />
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="mb-4 flex justify-between">
        <span className="text-body-m flex flex-row font-normal xl:font-semibold">
          {pointEstimateToNumber(task.pointEstimate)}
          <span className="flex xl:hidden">{` Pts`}</span>
          <span className="hidden xl:flex">{` Points`}</span>
        </span>
        <div className="text-body-m flex flex-row rounded-sm bg-neutral-100/10 px-4 py-1 font-normal text-neutral-50 xl:font-semibold">
          <img className="mr-2.5" src={alarmIcon} alt="alarm icon" />
          {formatDate(task.dueDate)}
        </div>
      </div>
      <div className="mb-4 flex gap-2">
        {task.tags &&
          task.tags.map((tag) => {
            const { bg, text } = tagColors[tag];
            return (
              <span
                key={tag}
                className={`text-body-m rounded-sm px-4 py-1 font-semibold ${bg} ${text}`}
              >
                {tag}
              </span>
            );
          })}
      </div>
      <div className="mb-2 flex justify-between">
        <img className="h-8 w-8" src={avatar} alt="profile"></img>
        <div className="flex flex-row items-center">
          <img src={fileIcon} alt="file" className="mr-4"></img>
          <span className="text-body-m mr-1">5</span>
          <img src={fileIcon} alt="commits" className="mr-4"></img>
          <span className="text-body-m mr-1">3</span>
          <img src={commentIcon} alt="comments"></img>
        </div>
      </div>
    </div>
  );
};
