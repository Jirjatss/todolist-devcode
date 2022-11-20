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
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import ModalDelete from "./ModalDelete";

const EditActivity = () => {
  const [activity, setActivity] = useState([]);
  const [sortValue, setSortValue] = useState("terbaru");
  const id = window.location.pathname;
  const nav = useNavigate();
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);
  const params = useParams();
  const data1 = item.todo_items;
  const [show1, setShow1] = useState(false);

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
    Swal.fire({
      icon: "success",
      html: '<span className="font-medium">List berhasil ditambahkan</span>',
      showConfirmButton: false,
      timer: 1000,
    });
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
      setItem(res.data);
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

  const editTodo = async (id, title, priority) => {
    const request = {
      title,
      priority,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, request, headers)
      .then((response) => {
        setItem(response.data);
      })
      .catch((err) => console.alert(err.message));
    await getItemsList();
    setData([]);
  };

  const backPath = () => {
    nav("/");
  };

  const sortedTodo = useMemo(() => {
    let items = data1;

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
        <Title item={activity} afterChange={getItemsList} setSortValue={setSortValue} sortValue={sortValue} />
        <div className="lg:px-16 px-2">
          {data1 == 0 && (
            <>
              <img src={empty} alt="empty-state" className="lg:w-1/3 h-80 mx-auto -mt-4 " data-cy="todo-empty-state" />
            </>
          )}

          {data1 && (
            <>
              {sortedTodo.map((el) => {
                return (
                  <>
                    <ItemTodo key={el.id} id={el.id} is_active={el.is_active} title={el.title} priority={el.priority} setStatus={setActiveStatus} setData={setData} del={deltodo} show={setShow1} />
                    <ModalEdit id={el.id} title={el.title} priority={el.priority} edit={editTodo} />
                    <ModalDelete title={el.title} id={el.id} show={show1} show1={setShow1} del={deltodo} />
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
