import React from "react";
import TaskView from "./TaskView";
import { Task } from '../../types/Task';
import { Action } from "../../types/Action";

type Props = {
    viewTask: Task[];
    taskListDispatch: React.Dispatch<Action>;
};

const TaskListView: React.FC<Props> = ({  viewTask, taskListDispatch }) => {
    return (
        <div className=' h-full w-full my-4 flex flex-col overflow-auto'>
            {viewTask.map((task) => (
                <TaskView key={task.taskId} taskListDispatch={taskListDispatch} task={task} editButtonText='編集' deleteButtonText='削除' />
            ))}
        </div>
    );
};

export default TaskListView;