import React, { useEffect, useState, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AppTitle from './components/AppTitle';
import AddTask from './components/AddTask';
import TaskListView from './components/TaskListView/TaskListView';
import FilterTask from "./components/FilterTask/FilterTask";
import { Task } from './types/Task';
import { Action } from './types/Action';

const App: React.FC = () => {

  const initTask = (): Task[] => {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
      return JSON.parse(tasksString);
    };
    return [];
  };

  const taskListReducer = (taskListState: Task[], action: Action): Task[] => {
    switch (action.type) {
      case 'addTask':{ 
        const newTask: Task = { taskId: uuid(), taskName: action.payload as string, completed: false };
        return [...taskListState, newTask];
      }
      case 'editTaskName':{
        const newTaskList = taskListState.map((task: Task) => task.taskId === (action.payload as Task).taskId ? { ...(action.payload as Task), taskName: (action.payload as Task).taskName } : task);
        return newTaskList;
      }
      case 'deleteTask': {
        const newTaskList = taskListState.filter((task: Task) =>task.taskId !== (action.payload as Task).taskId);
        return newTaskList;
      }
      case 'changeTaskCondition':{
        const newTaskList = taskListState.map((task: Task) => task.taskId === (action.payload as Task).taskId ? { ...(action.payload as Task), completed: !(action.payload as Task).completed } : task);
        return [...newTaskList];
      }
      case 'resetTask':
        return [];
      default:
        return taskListState;
      };
  };

  const [taskList, taskListDispatch] = useReducer<React.Reducer<Task[], Action>>(taskListReducer, initTask());
  const [viewTask, setViewTask] = useState<Task[]>(taskList);
  const [condition, setCondition] = useState<string>('全て');
  
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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className='h-full flex justify-center items-center bg-indigo-950 '>
      <div className='relative container mx-auto h-5/6 w-2/6 py-4 flex flex-col items-center text-gray-400'>
        <AppTitle title='Todo App' />
        <AddTask taskListDispatch={taskListDispatch} inputPlaceholder='タスクを入力してください' addButtonText='追加' />
        <FilterTask condition={condition} setCondition={setCondition} />
        <TaskListView viewTask={viewTask} taskListDispatch={taskListDispatch} />
        {taskList.length > 0 && <button className="absolute bottom-0 right-0 text-xs font-bold hover:text-gray-200" onClick={() => taskListDispatch({type: 'resetTask'})}>全て削除</button>}
      </div>
    </div>
  );
};

export default App;
