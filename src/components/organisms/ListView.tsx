import { Section } from "../molecules/SectionList";

export const TaskListView = () => {
  const tasks = {
    todo: [
      {
        id: 1,
        title: "Create wireframe",
        estimate: "4 Points",
        taskTags: ["ios", "android"],
        assignee: "Amelia Nelson",
        due: "Yesterday",
      },
      {
        id: 2,
        title: "Slack Logo Design",
        estimate: "2 Points",
        taskTags: ["ios", "android"],
        assignee: "Jonah Doe",
        due: "Today",
      },
      {
        id: 3,
        title: "Dashboard Design",
        estimate: "8 Points",
        taskTags: ["ios", "android"],
        assignee: "Jason Joe",
        due: "6 July, 2020",
      },
    ],
    inProgress: [
      {
        id: 4,
        title: "Dashboard Design",
        assignee: "Amelia Nelson",
        taskTags: ["ios", "android"],
        due: "6 July, 2020",
      },
      {
        id: 5,
        title: "Extramark Logo Design",
        assignee: "Jonah Doe",
        taskTags: ["ios", "android"],
        due: "6 July, 2020",
      },
    ],
    reviews: [
      {
        id: 6,
        title: "Final Review",
        assignee: "Team Lead",
        taskTags: ["ios", "android"],
        due: "6 July, 2020",
      },
      {
        id: 7,
        title: "Final Review",
        assignee: "Team Lead",
        taskTags: ["ios", "android"],
        due: "6 July, 2020",
      },
      {
        id: 8,
        title: "Final Review",
        assignee: "Team Lead",
        taskTags: ["ios", "android"],
        due: "6 July, 2020",
      },
    ],
  };
  return (
    <div className="w-full">
      <div className="min-w-[900px] lg:min-w-0">
        <div className="mb-4 rounded-sm border border-neutral-200 bg-neutral-300 text-neutral-50">
          <div className="text-body-m grid grid-cols-[2fr_1fr_1fr_1fr_1fr] divide-x divide-neutral-200">
            <span className="p-4"># Task Name</span>
            <span className="p-4">Task Tags</span>
            <span className="p-4">Estimate</span>
            <span className="p-4">Task Assignee</span>
            <span className="p-4">Due Date</span>
          </div>
        </div>

        <Section title="To Do" tasks={tasks.todo} />
        <Section title="In Progress" tasks={tasks.inProgress} />
        <Section title="Reviews" tasks={tasks.reviews} />
      </div>
    </div>
  );
};
