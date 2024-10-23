// components/TaskList.tsx
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarForm } from "./calenderform";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define Task and TaskList types
interface TaskProps {
  id: number;
  name: string;
  dueDate: Date;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

interface TaskComponentProps {
  task: TaskProps;
  index: number;
  moveTask: (fromIndex: number, toIndex: number) => void;
  toggleComplete: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number) => void;
}

const TASK_TYPE = "TASK";

// Initial tasks
const initialTasks: TaskProps[] = [
  { id: 1, name: "Complete Next.js Tutorial", dueDate: new Date(), priority: "High", completed: false },
  { id: 2, name: "Go grocery shopping", dueDate: new Date(), priority: "Low", completed: false },
  { id: 3, name: "Prepare for meeting", dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), priority: "Medium", completed: false },
  { id: 4, name: "Finish React project", dueDate: new Date(new Date().setDate(new Date().getDate() - 2)), priority: "High", completed: false },
];

const Task: React.FC<TaskComponentProps> = ({ task, index, moveTask, toggleComplete, deleteTask, editTask }) => {
  const [, ref] = useDrag({
    type: TASK_TYPE,
    item: { index },
  });

  const [_, drop] = useDrop({
    accept: TASK_TYPE,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index; // Update dragged item's index
      }
    },
  });

  const combinedRef = (node: HTMLDivElement | null) => {
    ref(node); // use the drag ref
    drop(node); // use the drop ref
  };

  return (
    <div ref={combinedRef} className={`p-2 border-b ${task.completed ? "bg-gray-200" : ""}`}>
      <div className="flex justify-between items-center">
        <div>
          <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
          <span className={`ml-2 ${task.completed ? "line-through" : ""}`}>{task.name}</span>
        </div>
        <div>
          <button className="text-blue-500 mr-2" onClick={() => editTask(task.id)}>Edit</button>
          <button className="text-red-500" onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        Due: {format(task.dueDate, "MMM dd, yyyy")} | Priority: {task.priority}
      </div>
    </div>
  );
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskProps | null>(null);
  const [filter, setFilter] = useState<string>(""); // Track the selected filter

  const addTask = (task: TaskProps) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    setDialogOpen(false);
  };

  const editTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
      setDialogOpen(true);
    }
  };

  const handleEditSubmit = (updatedTask: TaskProps) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setDialogOpen(false);
  };

  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (fromIndex: number, toIndex: number) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  // Filter tasks based on selected option
  const getFilteredTasks = () => {
    switch (filter) {
      case "today":
        return tasks.filter(task => {
          const today = new Date();
          return task.dueDate.toDateString() === today.toDateString();
        });
      case "overdue":
        return tasks.filter(task => task.dueDate < new Date() && !task.completed);
      case "high":
        return tasks.sort((a, b) => a.priority === "High" ? -1 : 1);
      case "low":
        return tasks.sort((a, b) => a.priority === "Low" ? -1 : 1);
      default:
        return tasks;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-[#FFC83A] text-[#333333] px-8 py-2 rounded-md font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FFC83A]" >Filter Tasks</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter("today")}>Due Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("overdue")}>Overdue</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter("high")}>Priority High</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("low")}>Priority Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button className="ml-6 bg-[#FFC83A] text-[#333333] px-8 py-2 rounded-md font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FFC83A]" onClick={() => setDialogOpen(true)}>
              Add Task
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentTask ? "Edit Task" : "Add Task"}</DialogTitle>
              <DialogDescription>
                Fill in the task details.
              </DialogDescription>
            </DialogHeader>
            <CalendarForm
              onSubmit={currentTask ? handleEditSubmit : addTask}
              existingTask={currentTask}
            />
          </DialogContent>
        </Dialog>

        <div className="mt-4">
          {getFilteredTasks().map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              moveTask={moveTask}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskList;
