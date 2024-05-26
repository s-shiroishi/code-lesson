import React, { useEffect, useState } from 'react';
import AppTitle from './components/AppTitle';
import AddTask from './components/AddTask';
import TaskListView from './components/TaskListView/TaskListView';
import FilterTask from "./components/FilterTask/FilterTask";
import { Task } from './types/Task';
import { getTaskHandler } from './utils/supabaseFunctions';


const App: React.FC = () => {

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [viewTask, setViewTask] = useState<Task[]>(taskList);
  const [condition, setCondition] = useState<string>('全て');

  useEffect(() => {
    getTaskHandler(setTaskList);
  },[])
  
  useEffect(() => {
    const newViewTask = () => {
      return taskList.filter((task: Task) => {
        if (condition === '全て') return true;
        if (condition === '完了') return task.completed;
        if (condition === '未完了') return !task.completed;
      });
    };
    setViewTask(newViewTask);
  }, [taskList, condition]);

  return (
    <div className='h-full flex justify-center items-center bg-indigo-950 '>
      <div className='relative container mx-auto h-5/6 w-2/6 py-4 flex flex-col items-center text-gray-400'>
        <AppTitle title='Todo App' />
        <AddTask setTaskList={setTaskList}  inputPlaceholder='タスクを入力してください' addButtonText='追加' />
        <FilterTask condition={condition} setCondition={setCondition} />
        <TaskListView viewTask={viewTask} setTaskList={setTaskList} />
      </div>
    </div>
  )
};

export default App;
