// 親コンポーネントのフォルダを作成してそこに配置する
import React, { useState, useEffect } from "react";
import { Task } from '../../types/Task';
import {updateTaskHandler, deleteTaskHandler} from '../../utils/supabaseFunctions';

type Props = {
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    task: Task;
    editButtonText: string;
    deleteButtonText: string;
}

const TaskView: React.FC<Props> = ({ setTaskList, task, editButtonText, deleteButtonText }) => {

    const [taskName, setTaskName] = useState<string>(task.name as string);
    const [update, setUpdate] = useState<boolean>(false);
    const [taskCondition, setTaskCondition] = useState<boolean>(task.completed as boolean);

    useEffect(() => {
        updateTaskHandler({...task, completed: taskCondition}, setTaskList);
    }, [taskCondition]);

    useEffect(() => {
        if(update){
            updateTaskHandler({...task, name: taskName}, setTaskList);
            setUpdate(false);
        }
    }, [update])

    const handleDeleteTask = async () => {
        deleteTaskHandler(task, setTaskList);
    };

    return (
        <div className='h-12 w-full my-2 px-4 flex items-center justify-between rounded-lg bg-purple-900' data-task-id={task.id}>
            <input type='checkbox' className={`checkbox-common ${taskCondition ? 'comp-checkbox' : 'incomp-checkbox'}` } checked={taskCondition}  onChange={(e) => setTaskCondition(e.target.checked)} ></input>
            <input className='w-2/3 px-2 text-gray-200 bg-purple-900 focus:outline-0 focus:bg-white focus:text-black focus:rounded-md' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            <button className='hover:text-gray-200' onClick={() => setUpdate(true)}>{editButtonText}</button>
            <button className='hover:text-gray-200' onClick={handleDeleteTask}>{deleteButtonText}</button>
        </div>
    );
};

export default TaskView;