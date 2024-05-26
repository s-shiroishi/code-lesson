import supabase from './supabase';
import { Task } from '../types/Task';

const getTask = async () => {
  const {data, error} = await supabase.from('tasks').select().order('id');
  if (data) {
    return data;
  };
  if (error) {
    throw new Error('タスクの読み込みに失敗しました');
  };
  return [];
};

const insertTask = async (name: string) => {
    const {error} = await supabase.from('tasks').insert({name});
    if (error) {
      throw new Error('タスクの追加に失敗しました');
    };
  };

const updateTask = async (task: Task) => {
    const {error} = await supabase.from('tasks').update({name: task.name, completed: task.completed}).eq('id', task.id);
    if (error) {
        throw new Error('タスクの更新に失敗しました');
    }
};

const deleteTask = async (task: Task) => {
    const {error} = await supabase.from('tasks').delete().eq('id', task.id);
    if (error) {
        throw new Error('タスクの削除に失敗しました');
    }
};

export const getTaskHandler = async (setTaskList: React.Dispatch<React.SetStateAction<Task[]>>) => {
  const tasks = await getTask();
  setTaskList(tasks);
};

export const insertTaskHandler = async (taskName: string, setTaskList: React.Dispatch<React.SetStateAction<Task[]>>, setTaskInput: React.Dispatch<React.SetStateAction<string>>) => {
    if (!taskName) {
        return;
    }
    await insertTask(taskName);
    const newTasks = await getTask();
    setTaskList(newTasks);
    setTaskInput('');
};

export const updateTaskHandler = async (task: Task, setTaskList: React.Dispatch<React.SetStateAction<Task[]>>) => {
    await updateTask(task);
    const newTasks = await getTask();
    setTaskList(newTasks);
};

export const deleteTaskHandler = async (task: Task, setTaskList: React.Dispatch<React.SetStateAction<Task[]>>) => {
    await deleteTask(task);
    const newTasks = await getTask();
    setTaskList(newTasks);
};
