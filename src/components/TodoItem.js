import React, { useState } from "react";
import * as Icon from "react-feather";
import { formatDate } from "../utils/tools";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function TodoItem({ todo, onDelete, onTodoFinished, onEditTodo, isDetail }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  let buttonAction;
  if (!todo.is_finished) {
    buttonAction = (
      <button
        onClick={() => onTodoFinished(todo.id, 1)}
        className="btn btn-outline-success me-2"
      >
        <Icon.Check />
        <span> Selesai </span>{" "}
      </button>
    );
  } else {
    buttonAction = (
      <button
        onClick={() => onTodoFinished(todo.id, 0)}
        className="btn btn-outline-danger me-2"
      >
        <Icon.X />
        <span> Belum Selesai </span>{" "}
      </button>
    );
  }

  const handleEdit = () => {
    setShowEditModal(true); // Show modal
  };

  // const handleSaveEdit = () => {
  //   onEditTodo(todo.id, editedTitle, editedDescription);
  //   setShowEditModal(false);
  // };
  const handleSaveEdit = () => {
    if (typeof onEditTodo === "function") {
      onEditTodo(todo.id, editedTitle, editedDescription);
      setShowEditModal(false);
    } else {
      console.error("onEditTodo is not a function");
      Swal.fire({
        title: "Error",
        text: "Unable to edit todo. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5>
              {" "}
              {!isDetail ? (
                <Link to={`/detail/${todo.id}`}> {todo.title} </Link>
              ) : (
                todo.title
              )}{" "}
            </h5>{" "}
            <div>
              {" "}
              {todo.is_finished ? (
                <div>
                  <Icon.Check />
                  <span className="ms-2 text-success">
                    {" "}
                    {formatDate(todo.updated_at)}{" "}
                  </span>{" "}
                </div>
              ) : null}{" "}
              <div>
                <Icon.Clock />
                <span className="ms-2 text-muted">
                  {" "}
                  {formatDate(todo.created_at)}{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="d-flex">
            {" "}
            {buttonAction}{" "}
            <button
              onClick={handleEdit}
              className="btn btn-outline-primary me-2"
            >
              <Icon.Edit />
              <span> Edit </span>{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <p> {todo.description} </p>{" "}
          </div>{" "}
          {!isDetail ? (
            <div className="d-flex">
              <div className="text-end">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Hapus Todo",
                      text: `Apakah kamu yakin ingin mehapus todo: ${todo.title}?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Ya, Tetap Hapus",
                      customClass: {
                        confirmButton: "btn btn-danger me-3 mb-4",
                        cancelButton: "btn btn-secondary mb-4",
                      },
                      buttonsStyling: false,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onDelete(todo.id);
                      }
                    });
                  }}
                  className="btn btn-danger"
                >
                  <Icon.Trash />
                </button>{" "}
              </div>{" "}
            </div>
          ) : null}{" "}
        </div>{" "}
      </div>{" "}
      {/* Modal for editing title and description */}{" "}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> Edit Todo </h5>{" "}
              </div>{" "}
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="editTitle"> Judul </label>{" "}
                  <input
                    type="text"
                    id="editTitle"
                    className="form-control"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />{" "}
                </div>{" "}
                <div className="form-group mt-3">
                  <label htmlFor="editDescription"> Deskripsi </label>{" "}
                  <textarea
                    id="editDescription"
                    className="form-control"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Batal{" "}
                </button>{" "}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  Simpan{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    is_finished: PropTypes.number.isRequired,
    cover: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onTodoFinished: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired,
};

export default TodoItem;
