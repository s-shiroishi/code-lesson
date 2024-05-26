// 親コンポーネントのフォルダを作成してそこに配置する
import React, { useState } from "react";
import { Task } from '../../types/Task';
import { Action } from "../../types/Action";

type Props = {
    taskListDispatch: React.Dispatch<Action>;
    task: Task;
    editButtonText: string;
    deleteButtonText: string;
}

const TaskView: React.FC<Props> = ({ taskListDispatch, task, editButtonText, deleteButtonText }) => {

    const [taskName, setTaskName] = useState<string>(task.taskName);
    return (
        <div className='h-12 w-full my-2 px-4 flex items-center justify-between rounded-lg bg-purple-900' data-task-id={task.taskId}>
            <input type='checkbox' className={`checkbox-common ${task.completed ? 'comp-checkbox' : 'incomp-checkbox'}`} onClick={() => taskListDispatch({type: 'changeTaskCondition', payload: task})}></input>
            <input className='w-2/3 text-gray-200 bg-purple-900 focus:outline-0' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            <button className='hover:text-gray-200' onClick={() => {
                task.taskName = taskName;
                taskListDispatch({type: 'editTaskName', payload: task});
            }}>{editButtonText}</button>
            <button className='hover:text-gray-200' onClick={() => taskListDispatch({type: 'deleteTask', payload: task})}>{deleteButtonText}</button>
        </div>
    );
};

export default TaskView;