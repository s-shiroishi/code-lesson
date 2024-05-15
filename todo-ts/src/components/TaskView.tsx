import React, { useState } from "react";
import { Task } from '../types/Task';

type Props = {
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    task: Task;
    editButtonText: string;
    deleteButtonText: string;
}

const TaskView: React.VFC<Props> = ({ setTaskList, task, editButtonText, deleteButtonText }) => {

    const [userInput, setUserInput] = useState<string>(task.taskName);

    const conditionHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const prevTasksString = localStorage.getItem('tasks');
        if (prevTasksString) {
            const prevTasks = JSON.parse(prevTasksString);
            const editTaskId = (e.target as HTMLElement).parentElement?.dataset.taskId;
            const newTasks = prevTasks.map((task: Task) => task.taskId === editTaskId ? { ...task, completed: !task.completed } : task);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            setTaskList(newTasks);
        };
    };

    const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const prevTasksString = localStorage.getItem('tasks');
        if (prevTasksString) {
            const prevTasks = JSON.parse(prevTasksString);
            const editTaskId = (e.target as HTMLElement).parentElement?.dataset.taskId;
            const newTasks = prevTasks.map((task: Task) => task.taskId === editTaskId ? { ...task, taskName: userInput } : task);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            setTaskList(newTasks);
        };
    };
    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const prevTasksString = localStorage.getItem('tasks');
        if (prevTasksString) {
            const prevTasks = JSON.parse(prevTasksString);
            const deleteTaskId = (e.target as HTMLElement).parentElement?.dataset.taskId;
            const newTasks = prevTasks.filter((task: Task) => task.taskId !== deleteTaskId);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            setTaskList(newTasks);
        }
    };

    return (
        <div className='h-12 w-full my-2 px-4 flex items-center justify-between rounded-lg bg-purple-900' data-task-id={task.taskId}>
            <input type='checkbox' className={`checkbox-common ${task.completed ? 'comp-checkbox' : 'incomp-checkbox'}`} onClick={(e) => conditionHandler(e)}></input>
            <input className='w-2/3 text-gray-200 bg-purple-900 focus:outline-0' value={userInput} onChange={(e) => setUserInput(e.target.value)} />
            <button className='hover:text-gray-200' onClick={(e) => editHandler(e)}>{editButtonText}</button>
            <button className='hover:text-gray-200' onClick={(e) => deleteHandler(e)}>{deleteButtonText}</button>
        </div>
    );
};

export default TaskView;