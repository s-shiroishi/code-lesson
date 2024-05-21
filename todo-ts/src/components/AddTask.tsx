import React, { useState } from "react";
import { Action } from "../types/Action";

type Props = {
    taskListDispatch: React.Dispatch<Action>;
    inputPlaceholder: string;
    addButtonText: string;
};

const AddTask: React.FC<Props> = ({ taskListDispatch, inputPlaceholder, addButtonText }) => {

    const [taskInput, setTaskInput] = useState<string>('');

    const addHandler = () => {
        taskListDispatch({type: 'addTask', payload: taskInput});
        setTaskInput('');
    }

    return (
        <>
            <div className='h-1/6 w-full py-2 flex items-center'>
                <div className='h-8 w-full flex items-center justify-center'>
                    <input value={taskInput} onChange={(e) => setTaskInput(e.target.value)} type='text' className='h-full w-2/3 px-2 flex-1 text-gray-200 border-2 border-purple-800 bg-indigo-950 focus:outline-0' placeholder={inputPlaceholder} />
                    <button className='h-full w-2/12 flex-none inline-block bg-purple-800 hover:text-gray-200' onClick={addHandler}>{addButtonText}</button>
                </div>
            </div>
        </>
    );
};

export default AddTask;