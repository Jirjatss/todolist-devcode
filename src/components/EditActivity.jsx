import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import ItemTodo from "./ItemTodo";
import ModalAdd from "./ModalAdd";
import Nav from "./Nav";
import Title from "./Title";
import empty from "../assets/todo-empty-state.svg";
import Swal from "sweetalert2";
import ModalEdit from "./ModalEdit";

const EditActivity = () => {
  const [activity, setActivity] = useState([]);
  const [sortValue, setSortValue] = useState("terbaru");
  const id = window.location.pathname;
  const nav = useNavigate();
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);
  const params = useParams();
  const data1 = item.todo_items;
  const [modal, setModal] = useState(false);

  const setActiveStatus = async (id, isActive) => {
    const request = {
      is_active: isActive === 0 ? 1 : 0,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, request, headers).then((res) => {
      console.log(res.data);
    });
    return;
  };

  const getEditdata = async () => {
    await axios
      .get(`https://todo.api.devcode.gethired.id/activity-groups${id}`)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTodo = async (title, priority) => {
    const request = {
      activity_group_id: params.id,
      title,
      priority,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .post(`https://todo.api.devcode.gethired.id/todo-items`, request, headers)
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => console.log(err.message));
    setData([]);
  };

  const deltodo = (id, title) => {
    axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`).then((res) => {
      return setItem(res.data);
    });
    setData([]);
  };

  const getItemsList = async () => {
    await axios
      .get(`https://todo.api.devcode.gethired.id/activity-groups/${params.id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  const backPath = () => {
    nav("/");
  };

  const sortedTodo = useMemo(() => {
    let items = item?.todo_items;

    function compare(a, b, sortedKey, sortedType) {
      if (sortedType === "desc") {
        if (a[sortedKey] < b[sortedKey]) {
          return -1;
        }
        if (a[sortedKey] > b[sortedKey]) {
          return 1;
        }
        return 0;
      }
      if (a[sortedKey] > b[sortedKey]) {
        return -1;
      }
      if (a[sortedKey] < b[sortedKey]) {
        return 1;
      }
      return 0;
    }

    if (sortValue === "terbaru" && items) {
      items.sort((a, b) => compare(a, b, "id", "asc"));
    }
    if (sortValue === "terlama") items = items?.sort((a, b) => compare(a, b, "id", "desc"));
    if (sortValue === "a_z") items = items?.sort((a, b) => compare(a, b, "title", "desc"));
    if (sortValue === "z_a") items = items?.sort((a, b) => compare(a, b, "title", "asc"));
    if (sortValue === "belum_selesai") items = items?.sort((a, b) => compare(a, b, "is_active", "asc"));

    return items;
  }, [sortValue, item]);

  useEffect(() => {
    getItemsList();
    getEditdata();
  }, [activity]);

  return (
    <div className="bg-white h-screen text-black font-signika" data-cy="edit-activity">
      <Nav />
      <div key={activity.id} id={`detail/(activity.id)`} className="bg-white">
        <Title title={activity.title} back={backPath} button={<ArrowLeft />} data_cy={"todo-add-button"} sort={"todo-sort-button"} />
        <div className="lg:px-16 px-2">
          {data1 == 0 && (
            <>
              <img src={empty} alt="empty-state" className="lg:w-1/3 h-80 mx-auto -mt-4 " data-cy="todo-empty-state" />
            </>
          )}

          {data1 && (
            <>
              {data1.map((el) => {
                return (
                  <>
                    <ItemTodo key={el.id} id={el.id} is_active={el.is_active} title={el.title} priority={el.priority} del={deltodo} status={() => setActiveStatus(el.id, el.is_active)} setData={setData} props={el} setModal={setModal} />
                    {/* <ModalEdit key={el.id} id={el.id} title={el.title} priority={el.priority} /> */}

                    <input type="checkbox" id="deltodo" data-cy="modal-delete" className={modal ? "modal-toggle" : "hidden"} />
                    <label htmlFor="deltodo" className="modal cursor-pointer" data-cy="todo-item-delete-button">
                      <label className="modal-box relative bg-white" htmlFor="">
                        <div className="text-center text-7xl mb-5">⚠️</div>
                        <h3 className="text-lg text-center">Apakah anda yakin menghapus activity?</h3>
                        <h3 className="font-bold text-lg text-center">"{el.title}"</h3>
                        <div className="modal-action grid grid-cols-2 px-10">
                          <label htmlFor="deltodo" className="btn bg-slate-400 border-none hover:bg-slate-500 text-black rounded-full" data-cy="modal-delete-cancel-button">
                            Batal
                          </label>
                          <label htmlFor="infotodo" className="btn bg-red-500 border-none hover:bg-red-600 text-white rounded-full" onClick={() => deltodo(el.id, setModal(false))} data-cy="modal-delete-confirm-button">
                            Hapus
                          </label>
                        </div>
                      </label>
                    </label>
                    <input type="checkbox" id="infotodo" className="modal-toggle" data-cy="modal-information" />
                    <label htmlFor="infotodo" className="modal cursor-pointer" data-cy="modal-information">
                      <label className="modal-box relative  bg-white" htmlFor="">
                        <h3 className="text-lg">
                          <span>✔️</span> "{el.title}" Berhasil dihapus
                        </h3>
                      </label>
                    </label>
                  </>
                );
              })}
            </>
          )}
          <ModalAdd data={data} createTodo={createTodo} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default EditActivity;
