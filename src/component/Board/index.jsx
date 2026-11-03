import React, { useState } from "react";

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-blue-500",
    tasks: [
      { id: 1, title: "Design login page", priority: "High" },
      { id: 2, title: "Create database schema", priority: "Medium" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "bg-amber-500",
    tasks: [
      { id: 3, title: "Set up React project", priority: "High" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "bg-emerald-500",
    tasks: [
      { id: 4, title: "Install React", priority: "Low" },
    ],
  },
];

function Board() {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState("");

  function addTask(event) {
    event.preventDefault();

    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      priority: "Medium",
    };

    setColumns((previousColumns) =>
      previousColumns.map((column) =>
        column.id === "todo"
          ? { ...column, tasks: [...column.tasks, task] }
          : column
      )
    );

    setNewTask("");
  }

  function deleteTask(columnId, taskId) {
    setColumns((previousColumns) =>
      previousColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      )
    );
  }

  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
              TaskFlow
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Collaborative project management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-600 sm:block">
              Demo User
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Board Information */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            ABC Technologies
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            Development Board
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
              Organization: ABC Technologies
            </span>
            <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
              Branch: Hyderabad
            </span>
          </div>
        </section>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="mb-8 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
        >
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="What needs to be done?"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
          >
            + Add Task
          </button>
        </form>

        {/* Kanban Columns */}
        <section className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {columns.map((column) => (
            <div
              key={column.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200/60"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ${column.color}`}
                  />
                  <h3 className="font-bold text-slate-800">
                    {column.title}
                  </h3>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600">
                  {column.tasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 px-3 pb-4">
                {column.tasks.map((task) => (
                  <article
                    key={task.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h4 className="break-words font-semibold text-slate-800">
                      {task.title}
                    </h4>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                          priorityStyles[task.priority]
                        }`}
                      >
                        {task.priority} Priority
                      </span>

                      <button
                        type="button"
                        onClick={() => deleteTask(column.id, task.id)}
                        className="text-sm font-medium text-red-500 transition hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}

                {column.tasks.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
                    No tasks yet
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-slate-400">
          TaskFlow · Collaborative Kanban Board
        </footer>
      </main>
    </div>
  );
}

export default Board;