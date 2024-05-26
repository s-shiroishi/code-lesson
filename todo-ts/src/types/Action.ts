import { Task } from "./Task";

export type Action = {
  type?: string;
  payload?: string | Task | Task[];
};