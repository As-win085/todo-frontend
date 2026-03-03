import { Component } from "react";

class TodoItem extends Component {
  state = {
    isEditing: false,
    editedTitle: this.props.todo.title,
  };

  onEditClick = () => {
    this.setState({ isEditing: true });
  };

  onChange = (e) => {
    this.setState({ editedTitle: e.target.value });
  };

  onSave = () => {
    const { todo, onEdit } = this.props;
    const { editedTitle } = this.state;

    if (editedTitle.trim() === "") return;

    onEdit(todo.id, editedTitle);
    this.setState({ isEditing: false });
  };

  onCancel = () => {
    const { todo } = this.props;
    this.setState({
      isEditing: false,
      editedTitle: todo.title,
    });
  };

  render() {
    const { todo, onDelete, onToggle } = this.props;
    const { isEditing, editedTitle } = this.state;

    return (
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-2">
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            />
        </td>

        <td className="px-4 py-2 text-left">
            {isEditing ? (
            <input
                type="text"
                value={editedTitle}
                onChange={this.onChange}
                className="border px-2 py-1 rounded w-full"
            />
            ) : (
            <span
                className={todo.completed ? "line-through text-gray-500" : ""}
            >
                {todo.title}
            </span>
            )}
        </td>

        <td className="px-4 py-2 space-x-2 flex justify-between">
            {isEditing ? (
            <>
                <button onClick={this.onSave} className="bg-blue-500 text-white px-2 py-1 rounded">
                Save
                </button>
                <button onClick={this.onCancel} className="bg-gray-500 text-white px-2 py-1 rounded">
                Cancel
                </button>
            </>
            ) : (
            <>
                <button onClick={this.onEditClick} className="bg-yellow-500 text-white px-2 py-1 rounded">
                Edit
                </button>
                <button onClick={() => onDelete(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
                </button>
            </>
            )}
        </td>
        </tr>
    );
  }
}

export default TodoItem;