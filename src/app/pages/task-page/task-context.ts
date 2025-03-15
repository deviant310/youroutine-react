import {
  createContext,
  createElement,
  memo,
  PropsWithChildren,
  useContext,
} from "react";

import { Task } from "~/concern/general/entities";

const TaskContext = createContext({} as Task);
const { Provider } = TaskContext;

export const TaskProvider = memo<PropsWithChildren<{ task: Task }>>(
  ({ task, children }) => createElement(Provider, { value: task }, children),
);

export const useTask = () => useContext(TaskContext);
