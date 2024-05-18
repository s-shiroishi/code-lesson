import React, { useEffect, useState } from 'react';
import AppTitle from './components/AppTitle';
import AddTask from './components/AddTask';
import TaskListView from './components/TaskListView';
import FilterTask from "./components/FilterTask";
import { Task } from './types/Task';

const App: React.VFC = () => {

  // localStrage からの初期化は useEffect ではなく useState に関数を作って渡す
  // const initTask = () => {
  //   const tasksString = localStorage.getItem('tasks');
  //   if (tasksString) {
  //     return JSON.parse(tasksString);
  //   }
  //   return []
  // }
  
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [condition, setCondition] = useState<string>('未完了');

  // こちらメソッドではなく viewTask という useState にして、
  // taskList と condition を第二引数とした useEffect の中で
  // setViewTask に代入する形で行った方が自然です。
  const viewTask = () => {
    // switch 文に方が見やすい
    if (condition === '全て') {
      return taskList;
    } else if (condition === '完了') {
      return taskList.filter((task: Task) => task.completed === true); // boolean の比較はいらない
    } else if (condition === '未完了') {
      return taskList.filter((task: Task) => task.completed !== true);
    }
    return [];

    // だいぶスッキリしました。可読性もいい感じです。
    // return taskList.filter((task: Task) => {
    //   if (condition === '全て') return true;  
    //   if (condition === '完了') return task.completed;
    //   if (condition === '未完了') return !task.completed;
    // });
  };

  // stateが実行されてからこちらが実行されるため、
  // taskList が画面際読み込みのたびに[]になってしまうので
  // initTask を useState に渡す方法に変える
  useEffect(() => {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
      const tasks = JSON.parse(tasksString);
      setTaskList(tasks);
    };
  }, []);

  // ローカルストレージの処理は一箇所にまとめる
  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(taskList));
  // }, [taskList]);

  const resetHandler = () => {
    localStorage.clear(); // 全てClearしてしまうので removeItem を使用
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
