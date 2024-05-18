import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { Task } from '../types/Task';

type Props = {
    taskList: Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    setCondition: React.Dispatch<React.SetStateAction<string>>;
    inputPlaceholder: string;
    addButtonText: string;
};

const AddTask: React.FC<Props> = ({ taskList, setTaskList, setCondition, inputPlaceholder, addButtonText }) => {

    const [userInput, setUserInput] = useState<string>('');

    const addHandler = () => {
        const newTask: Task = { taskId: uuid(), taskName: userInput, completed: false };
        const newTaskList = [...taskList, newTask];
        localStorage.setItem('tasks', JSON.stringify(newTaskList));
        setCondition('未完了'); // 親コンポーネントでメソッド作った方が可読性UP（useReducerで定義してもOK）
        setTaskList(newTaskList);
        setUserInput('');
    }

    return (
        <>
            <div className='h-1/6 w-full py-2 flex items-center'>
                <div className='h-8 w-full flex items-center justify-center'>
                    <input value={userInput} onChange={(e) => setUserInput(e.target.value)} type='text' className='h-full w-2/3 px-2 flex-1 text-gray-200 border-2 border-purple-800 bg-indigo-950 focus:outline-0' placeholder={inputPlaceholder} />
                    <button className='h-full w-2/12 flex-none inline-block bg-purple-800 hover:text-gray-200' onClick={addHandler}>{addButtonText}</button>
                </div>
            </div>
        </>
    );
};

export default AddTask;