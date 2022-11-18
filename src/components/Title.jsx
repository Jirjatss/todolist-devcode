import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Plus, SortUp } from "react-bootstrap-icons";

const CekPath = () => {
  const location = useLocation();
  return location.pathname;
};
const Title = (props) => {
  const [editTitle, setEditTitle] = useState(false);
  const [path, setPath] = useState();
  const currentPath = CekPath().substring(CekPath().lastIndexOf("/") + 1);
  const [title, setTitle] = useState(props.title);
  const id = window.location.pathname;

  const editTitleActivity = async (e) => {
    e.preventDefault();
    const request = {
      title: title,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups${id}`, request, headers).then((response) => {
      // return props.title(response.title);
    });
    setEditTitle(false);

    return;
  };

  useEffect(() => {
    setEditTitle(false);
  }, []);

  useEffect(() => {
    setPath(currentPath);
  }, [path]);
  return (
    <>
      <div className="flex justify-between items-center w-full py-12 lg:px-16 px-8">
        <div className="font-bold text-4xl flex" data-cy="activity-title">
          <span className="mr-2 cursor-pointer" onClick={props.back}>
            {props.button}
          </span>
          {path === "" ? (
            <span className="text-4xl">{props.title}</span>
          ) : (
            <>
              {editTitle === false ? (
                <span className="cursor-pointer text-2xl" data-cy="todo-title" onClick={() => setEditTitle(true)}>
                  {title} <span>📝</span>
                </span>
              ) : (
                <input
                  type="text"
                  id="item-title"
                  data-cy="todo-title"
                  className="bg-transparent border-b-2 font-bold lg:text-2xl sm:text-sm lg:w-96 md:w-96 w-44 h-8 rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={editTitleActivity}

                  // onKeyDown={setTitle(editTitleActivity())}
                />
              )}
            </>
          )}
        </div>
        {path === "" ? (
          <>
            <label htmlFor="">
              <label className="btn bg-sky-500 hover:bg-sky-600 border-none gap-2 h-2 font-semibold text-base normal-case px-6 lg:px-5 rounded-full" type="button" data-cy={props.data_cy} onClick={props.function} htmlFor="mymodal2">
                <span>
                  <Plus size={30} color={"white"} className="-mr-2" />
                </span>
                <span className="text-white">
                  <span className="hidden lg:block">Tambah</span>
                </span>
              </label>
            </label>
          </>
        ) : (
          <>
            <label htmlFor="">
              <label className="btn bg-sky-500 hover:bg-sky-600 border-none gap-2 h-2 font-semibold text-base normal-case mr-2 px-6 lg:px-5 rounded-full" type="button" data-cy={props.sort} htmlFor="mymodal2">
                <span>
                  <SortUp size={30} color={"white"} className="-mr-2" />
                </span>
              </label>
              <label className="btn bg-sky-500 hover:bg-sky-600 border-none gap-2 h-2 font-semibold text-base normal-case px-6 lg:px-5 rounded-full" type="button" data-cy={props.data_cy} onClick={props.function} htmlFor="mymodal2">
                <span>
                  <Plus size={30} color={"white"} className="-mr-2" />
                </span>
                <span className="text-white">
                  <span className="hidden lg:block">Tambah</span>
                </span>
              </label>
            </label>
          </>
        )}
      </div>
    </>
  );
};

export default Title;
