import React, { useEffect, useState } from 'react';
import AppTitle from './components/AppTitle';
import AddTask from './components/AddTask';
import TaskListView from './components/TaskListView';
import FilterTask from "./components/FilterTask";
import { Task } from './types/Task';

const App: React.VFC = () => {

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [condition, setCondition] = useState<string>('未完了');

  const viewTask = () => {
    if (condition === '全て') {
      return taskList;
    } else if (condition === '完了') {
      return taskList.filter((task: Task) => task.completed === true);
    } else if (condition === '未完了') {
      return taskList.filter((task: Task) => task.completed !== true);
    }
    return [];
  };

  useEffect(() => {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
      const tasks = JSON.parse(tasksString);
      setTaskList(tasks);
    };
  }, []);

  const resetHandler = () => {
    localStorage.clear();
    setTaskList([]);
  };

  return (
    <div className='h-full flex justify-center items-center bg-indigo-950 '>
      <div className='relative container mx-auto h-5/6 w-2/6 py-4 flex flex-col items-center text-gray-400'>
        <AppTitle title='Todo App' />
        <AddTask taskList={taskList} setTaskList={setTaskList} setCondition={setCondition} inputPlaceholder='タスクを入力してください' addButtonText='追加' />
        <FilterTask condition={condition} setCondition={setCondition} />
        <TaskListView viewTask={viewTask} setTaskList={setTaskList} />
        {taskList.length > 0 && <button className="absolute bottom-0 right-0 text-xs font-bold hover:text-gray-200" onClick={resetHandler}>全て削除</button>}
      </div>
    </div>
  );
};

export default App;
