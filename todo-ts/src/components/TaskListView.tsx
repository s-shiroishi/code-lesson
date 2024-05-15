import React from "react";
import TaskView from "./TaskView";
import { Task } from '../types/Task';

type Props = {
    viewTask: () => Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskListView: React.VFC<Props> = ({ viewTask, setTaskList }) => {
    return (
        <div className=' h-full w-full my-4 flex flex-col overflow-auto'>
            {viewTask().map((task) => (
                <TaskView key={task.taskId} setTaskList={setTaskList} task={task} editButtonText='編集' deleteButtonText='削除' />
            ))}
        </div>
    );
};

export default TaskListView;