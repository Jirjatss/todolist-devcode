import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ModalAdd = ({ data, createTodo, editTodo, setData }) => {
  const [list, setList] = useState("");
  const [openDropdown, setOpenDropdwon] = useState(false);
  const [priority, setPriority] = useState("Priority");
  const [color, setColor] = useState("");

  const editor = () => {
    if (data.id) {
      editTodo(data.id, list, priority);
      setData([]);
    } else {
      Swal.fire({
        icon: "success",
        html: '<span className="font-medium">Berhasil menambah List item</span>',
        showConfirmButton: false,
        timer: 1000,
      });
      createTodo(list, priority);
      setData([]);
    }
  };

  const priorityOption = [
    {
      name: "Very High",
      value: "very-high",
      color: "#ED4C5C",
    },
    {
      name: "High",
      value: "high",
      color: "#F8A541",
    },
    {
      name: "Normal",
      value: "normal",
      color: "#00A790",
    },
    {
      name: "Low",
      value: "low",
      color: "#428BC1",
    },
    {
      name: "Very Low",
      value: "very-low",
      color: "#8942C1",
    },
  ];

  useEffect(() => {
    setOpenDropdwon(false);
  }, []);

  useEffect(() => {
    if (data.edit) {
      setList(data.title);
      setPriority(data.priority);
      return;
    }
    setList("");
    setPriority("Choose Priority");
  }, [data]);

  return (
    <div className="relative  bg-white">
      <input type="checkbox" id="mymodal2" className="modal-toggle" />
      <div className="modal" data-cy="modal-add">
        <div className="modal-box bg-white border border-b-slate-400">
          <label htmlFor="mymodal2" className="btn btn-sm btn-circle absolute right-2 bg-red-600 top-2 text-white hover:bg-red-700 border-none">
            ✕
          </label>
          <h3 className="font-bold text-lg">Tambah item list</h3>
          <hr className="mb-6" />
          <label htmlFor="item" className="text-base ml-2">
            Nama List Item
          </label>
          <br />
          <input
            type="text"
            placeholder="Tambahkan nama list item"
            data-cy="modal-add-name-input"
            className="input border-primary outline-none ring-0 w-full rounded-md bg-white mt-2 mb-4 h-10"
            value={list}
            onChange={(e) => {
              setList(e.target.value);
            }}
          />
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            data-cy="modal-add-priority-dropdown"
            className=" bg-white input border-primary outline-none ring-0 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mt-2 w-44 relative"
            type="button"
            onClick={() => setOpenDropdwon(!openDropdown)}
          >
            {color === "" ? (
              <>{priority}</>
            ) : (
              <>
                <span className="block rounded-full h-4 w-4 mt-1 mr-3 font-normal" style={{ backgroundColor: `${color}` }}></span>
                {priority}
              </>
            )}

            <svg className="ml-2 w-4 h-4 absolute right-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {openDropdown ? (
            <>
              <div id="dropdown" className="z-10 w-44 bg-white rounded border border-primary mt-2 " data-cy="modal-add-priority-item">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault" tabIndex={0}>
                  {priorityOption.map((el) => {
                    return (
                      <button className="py-2 px-4 flex hover:bg-slate-200 w-full cursor-pointer" value={el.value} key={el.value} onClick={() => setPriority(el.value, setOpenDropdwon(false), setColor(el.color))}>
                        <a className="flex">
                          <span className="block rounded-full h-4 w-4 mt-1 mr-3 font-normal" style={{ backgroundColor: `${el.color}` }}></span>
                          {el.value}
                        </a>
                      </button>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="modal-action" data-cy="modal-add-save-button">
            {list === null || priority === "Choose Priority" ? (
              <label className="bg-blue-500 px-6 py-2 rounded-xl cursor-pointer font-semibold" disabled>
                Save
              </label>
            ) : (
              <label className="bg-blue-500 px-6 py-2 rounded-xl hover:bg-blue-600 cursor-pointer font-semibold" htmlFor="mymodal2" onClick={() => editor()}>
                Save
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
