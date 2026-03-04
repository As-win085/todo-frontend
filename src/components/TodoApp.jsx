import React, { Component } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import "./index.css";


import { TailSpin } from 'react-loader-spinner';

const API_URL = "https://todo-backend-1-w01b.onrender.com/api/tasks";

class TodoApp extends Component {
  state = {
    input: "",
    todos: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(API_URL);
      this.setState({ todos: response.data, loading: false });
    } catch (error) {
      this.setState({ error: "Failed to fetch tasks", loading: false });
    }
  };

  onChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onAdd = async () => {
    const { input } = this.state;
    if (input.trim() === "") return;

    try {
      await axios.post(API_URL, { title: input });
      this.setState({ input: "" });
      this.fetchTodos();
    } catch (error) {
      this.setState({ error: "Failed to add task" });
    }
  };

  onDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      this.fetchTodos();
    } catch (error) {
      this.setState({ error: "Failed to delete task" });
    }
  };

  handleToggleComplete = async (id) => {
    const { todos } = this.state;
    const todo = todos.find((t) => t.id === id);

    try {
      await axios.put(`${API_URL}/${id}`, {
        completed: !todo.completed,
      });
      this.fetchTodos();
    } catch (error) {
      this.setState({ error: "Failed to update task" });
    }
  };

  onEdit = async (id, newTitle) => {
  try {
    await axios.put(`${API_URL}/${id}`, {
      title: newTitle,
    });
    this.fetchTodos();
  } catch (error) {
    this.setState({ error: "Failed to update task" });
  }
};

  render() {
    const { input, todos, loading, error } = this.state;

    return (
      <div className="mt-2 p-4">
        <h1 className="text-xl mb-4 font-bold">To-Do App</h1>

        <div className="flex gap-3 mb-5">
          <input
            className="p-2 border w-3/4"
            type="text"
            value={input}
            onChange={this.onChange}
            placeholder="Add a new task..."
          />
          <button
            className="bg-green-500 px-4 py-2 text-white"
            onClick={this.onAdd}
          >
            Add
          </button>
        </div>

        {loading && <TailSpin color="#00BFFF" height={50} width={50} />}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">
                Tasks
                </h2>
                <span className="text-sm text-gray-500">
                {todos.length} Total
                </span>
            </div>

            <table className="w-full max-w-md border">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="px-4 py-2 text-left border-b">Done</th>
                    <th className="px-4 py-2 text-left border-b">Task</th>
                    <th className="px-4 py-2 text-left border-b">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onEdit={this.onEdit}
                        onDelete={this.onDelete}
                        onToggle={this.handleToggleComplete}
                    />
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    );
  }
}

export default TodoApp;