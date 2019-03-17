const initialData = {
  // task id is the key of the task object
  //
  tasks: {
    "task-1": { id: "task-1", content: "take out the garbage" },
    "task-2": { id: "task-2", content: "Go grocery shopping" },
    "task-3": { id: "task-3", content: "Do your taxes" },
    "task-4": { id: "task-4", content: "Meal Prep" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      task_ids: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      task_ids: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      task_ids: []
      // task_ids are used to indicate ownership and maintain order in the lists
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
  // records the order of the columns
};

export default initialData;
