import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataTodos } from "../store/actions/todosAction";
import { Trash } from "react-bootstrap-icons";
import empty from "../assets/activity-empty-state.svg";
import axios from "axios";
import Swal from "sweetalert2";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const dispatch = useDispatch();

  const { todos } = useSelector((state) => state.todo);
  const nav = useNavigate();

  function dateFunc(value) {
    let val = value.slice(0, 10).split("-");
    let monthNumber = parseInt(val[1]);
    let monthName = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][monthNumber - 1];
    val[1] = monthName;
    val = val.reverse().join(" ");
    return val;
  }

  function handledelete(id, title) {
    dispatch(getDataTodos(todos));
    nav("/");
    Swal.fire({
      icon: "warning",
      title: "Apakah anda yakin?",
      text: `"${title}"`,
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Hapus`,
    }).then((result) => {
      if (result.isDenied) {
        axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`).then((data) => {
          dispatch(getDataTodos(data));
        });
        Swal.fire({
          icon: "success",
          html: '<span className="font-medium" data-cy="modal-information">Activity berhasil dihapus </span>',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    const request = {
      title: "New Activity",
      email: "sajadhijir@gmail.com",
    };
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post("https://todo.api.devcode.gethired.id/activity-groups", request, headers)
      .then(() => {
        console.log("success add data");
        dispatch(getDataTodos());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openEdit = (id) => {
    nav(`/${id}`);
  };

  useEffect(() => {
    dispatch(getDataTodos());
  }, []);

  return (
    <div className="bg-white font-signika">
      <>
        {todos && (
          <>
            <Title title="Activity" function={handleAddTodo} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-4" data-cy="activity-item">
              {todos.map((el) => {
                return (
                  <div key={el.id} id={el.id}>
                    <div className="mx-auto py-2 w-full px-4 relative">
                      <div className="p-6 w-full lg:w-full h-56 bg-white rounded-xl border border-gray-200 shadow-xl inline-flex flex-col justify-between cursor-pointer" onClick={() => openEdit(el.id)}>
                        <h1 className="mb-2 text-xl font-bold" data-cy="activity-item-title">
                          {el.title}
                        </h1>
                        <div className="flex flex-row justify-between items-center">
                          <p className=" lg:font-medium text-gray-700 text-sm" data-cy="activity-item-date">
                            {dateFunc(el.created_at)}
                          </p>
                        </div>
                      </div>
                      <button htmlFor="my-modal" className="btn modal-button btn-circle btn-sm btn-outline btn-error absolute right-8 bottom-7" data-cy="activity-item-delete-button" onClick={() => handledelete(el.id, el.title)}>
                        <Trash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        :{todos.length === 0 && <img src={empty} alt="empty-state" className="lg:w-1/3 h-80 mx-auto -mt-10 " />}
      </>
    </div>
  );
};

export default Activity;
