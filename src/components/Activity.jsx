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
  const [modal, setModal] = useState();

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

  function handledelete(id) {
    axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`).then((data) => {
      dispatch(getDataTodos(data));
    });
    dispatch(getDataTodos(todos));
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
      .then((data) => {
        console.log("success add data");
        dispatch(getDataTodos(data));
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
            <Title title="Activity" function={handleAddTodo} data_cy={"activity-add-button"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-4" data-cy="activity-item">
              {todos.map((el) => {
                return (
                  <>
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
                        <label htmlFor="modal-delete" className="btn modal-button btn-circle btn-sm btn-outline btn-error absolute right-8 bottom-7" data-cy="activity-item-delete-button" onClick={() => setModal(true)}>
                          <Trash />
                        </label>
                      </div>
                      <input type="checkbox" id="modal-delete" data-cy="modal-delete" className={modal ? "modal-toggle" : "hidden"} />
                      <label htmlFor="modal-delete" className="modal cursor-pointer">
                        <label className="modal-box relative bg-white">
                          <div className="text-center text-7xl mb-5">⚠️</div>
                          <h3 className="text-lg text-center">Apakah anda yakin menghapus activity?</h3>
                          <h3 className="font-bold text-lg text-center">"{el.title}"</h3>
                          <div className="modal-action grid grid-cols-2 px-10">
                            <label htmlFor="modal-delete" className="btn bg-slate-400 border-none hover:bg-slate-500 text-black rounded-full" data-cy="modal-delete-cancel-button" onClick={() => setModal(!modal)}>
                              Batal
                            </label>
                            <label htmlFor="modal-informasi" className="btn bg-red-500 border-none hover:bg-red-600 text-white rounded-full" data-cy="modal-delete-confirm-button" onClick={() => handledelete(el.id, setModal(!modal))}>
                              Hapus
                            </label>
                          </div>
                        </label>
                      </label>

                      <input type="checkbox" id="modal-informasi" className="modal-toggle" data-cy="modal-information" />
                      <label htmlFor="modal-informasi" className="modal cursor-pointer" data-cy="modal-information">
                        <label className="modal-box relative  bg-white" htmlFor="">
                          <h3 className="text-lg">
                            <span>✔️</span> Activity Berhasil dihapus
                          </h3>
                        </label>
                      </label>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        :{todos.length === 0 && <img src={empty} alt="empty-state" className="lg:w-1/3 h-80 mx-auto -mt-10 " data-cy="activity-empty-state" />}
      </>
    </div>
  );
};

export default Activity;
