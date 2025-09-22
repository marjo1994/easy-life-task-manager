import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import type { GetTasksQuery } from "../../__generated__/graphql";
import { formatDate } from "../../utils/utils";
import { pointEstimateToNumber } from "../../utils/pointEstimateToNumber";
import { tagColors } from "../../utils/tagColors";
import fileIcon from "../../assets/file-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";
import avatar from "../../assets/avatar.png";

type Task = GetTasksQuery["tasks"][number];

type SectionProps = {
  title: string;
  tasks: Task[];
};

export const Section = ({ title, tasks }: SectionProps) => {
  return (
    <div className="mb-4 bg-neutral-300 text-neutral-50 shadow-md">
      <Disclosure>
        {({ open }) => (
          <div>
            <DisclosureButton className="text-title-s-mobile md:text-body-l flex w-full items-center rounded-t-sm border border-neutral-200 p-4 font-semibold">
              <span
                className={`mr-3 inline-block h-0 w-0 border-x-6 border-b-6 border-x-transparent border-b-neutral-100 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              ></span>
              <p className="text-title-s-mobile xl:text-body-l">
                {title}{" "}
                <span className="text-neutral-100">
                  ({String(tasks.length).padStart(2, "0")})
                </span>
              </p>
            </DisclosureButton>

            <DisclosurePanel className="divide-y divide-neutral-200">
              {tasks.map((task, index) => {
                const taskNumber = String(index + 1).padStart(2, "0");
                const firstTag = task.tags[0];
                const { bg, text, indicatorBg } = firstTag
                  ? tagColors[firstTag]
                  : {};
                const { text: dateText } = formatDate(task.dueDate);

                return (
                  <div
                    key={task.id}
                    className="text-body-m grid grid-cols-[2fr_1fr_1fr_1fr_1fr] divide-x divide-neutral-200 hover:bg-neutral-400 xl:grid-cols-[3fr_1fr_1fr_1fr_1fr]"
                  >
                    <span className="text-subheadline-m-mobile xl:text-body-m relative flex flex-row items-center py-4 pr-5 pl-10 font-normal">
                      {firstTag && (
                        <div
                          className={`absolute left-0 h-[85%] w-1 ${indicatorBg}`}
                        />
                      )}
                      {`${taskNumber} ${task.name}`}
                      <div className="ml-auto flex flex-row items-center gap-2">
                        <div className="flex flex-row items-center">
                          <span className="text-body-m mr-1">3</span>
                          <img src={commentIcon} alt="comments"></img>
                        </div>
                        <div className="flex flex-row items-center">
                          <span className="text-body-m mr-1">5</span>
                          <img src={fileIcon} alt="commits"></img>
                        </div>
                      </div>
                    </span>

                    <div className="flex gap-1 px-2 py-3">
                      {firstTag && (
                        <span
                          key={firstTag}
                          className={`text-body-s-mobile xl:text-body-m grid place-items-center rounded-sm px-2 py-0.5 font-semibold xl:px-4 xl:py-1 ${bg} ${text}`}
                        >
                          {firstTag}
                        </span>
                      )}

                      {task.tags.length > 1 && (
                        <span className="text-body-s-mobile xl:text-body-m grid place-items-center rounded-sm bg-neutral-200 px-2 py-0.5 font-semibold text-neutral-50 xl:px-4 xl:py-1">
                          +{task.tags.length - 1}
                        </span>
                      )}
                    </div>

                    <span className="text-subheadline-m-mobile xl:text-body-m flex flex-row items-center px-2 py-4 font-normal">
                      {pointEstimateToNumber(task.pointEstimate)} Points
                    </span>
                    <span className="text-subheadline-m-mobile xl:text-body-m flex flex-row items-center px-2 py-4 font-normal">
                      <img
                        className="mr-1 h-8 w-8"
                        src={avatar}
                        alt="profile"
                      />
                      {task.assignee?.fullName}
                    </span>
                    <span className="text-subheadline-m-mobile xl:text-body-m flex flex-row items-center px-2 py-4 font-normal">
                      {dateText}
                    </span>
                  </div>
                );
              })}
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};
