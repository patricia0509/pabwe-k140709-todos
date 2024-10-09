import React from "react";
import TodoList from "../components/TodoList";
import { getAllTodo, getTodo, editTodo, deleteTodo } from "../utils/data-todos";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function HomePageWrapper({ keyword }) {
  return <HomePage keyword={keyword} />;
}

HomePageWrapper.propTypes = {
  keyword: PropTypes.string.isRequired,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: getAllTodo(),
    };
    this.onTodoFinished = this.onTodoFinished.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onEditTodo = this.onEditTodo.bind(this);
  }

  onDeleteHandler(id) {
    deleteTodo(id);
    this.setState({
      todos: getAllTodo(),
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Todo berhasil dihapus!",
      showConfirmButton: false,
      timer: 700,
    });
  }

  onTodoFinished(id, status) {
    const targetTodo = getTodo(id);
    if (targetTodo) {
      editTodo({
        id,
        title: targetTodo.title,
        description: targetTodo.description,
        is_finished: status,
      });
      this.setState({
        todos: getAllTodo(),
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Berhasil mengubah status todo!`,
        showConfirmButton: false,
        timer: 700,
      });
    }
  }

  onEditTodo(id, newTitle, newDescription) {
    const targetTodo = getTodo(id);
    if (targetTodo) {
      editTodo({
        id,
        title: newTitle,
        description: newDescription,
        is_finished: targetTodo.is_finished,
      });
      this.setState({
        todos: getAllTodo(),
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil diubah!",
        showConfirmButton: false,
        timer: 700,
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <TodoList
            todos={this.state.todos}
            onDelete={this.onDeleteHandler}
            onTodoFinished={this.onTodoFinished}
            onEditTodo={this.onEditTodo}
            keywordSearch={this.props.keyword}
          />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default HomePageWrapper;