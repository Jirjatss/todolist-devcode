import axios from "axios";
import React, { useEffect, useState } from "react";

const ModalEdit = (props) => {
  const [title, setTitle] = useState("");
  const [prioritas, setPrioritas] = useState("");
  const [openDropdown, setOpenDropdwon] = useState(false);

  const editor = async (id) => {
    props.edit(id, title, prioritas);
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

  return (
    <div className="relative  bg-white">
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white border border-b-slate-400">
          <label htmlFor={props.id} className="btn btn-sm btn-circle absolute right-2 bg-red-600 top-2 text-white hover:bg-red-700 border-none">
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
            placeholder={props.title}
            data-cy="modal-edit-name-input"
            className="input border-primary outline-none ring-0 w-full rounded-md bg-white mt-2 mb-4 h-10"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className=" bg-white input border-primary outline-none ring-0 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mt-2 w-44 relative"
            type="button"
            onClick={() => setOpenDropdwon(!openDropdown)}
          >
            {!prioritas && (
              <div
                className={`inline-flex rounded-full h-4 w-4 mr-2 ${
                  props.priority === "very-high" ? "bg-[#ED4C5C]" : props.priority === "high" ? "bg-[#F8A541]" : props.priority === "normal" ? "bg-[#00A790]" : props.priority == "low" ? "bg-[#428BC1]" : "bg-[#8942C1]"
                }`}
              ></div>
            )}
            {prioritas && (
              <div
                className={`inline-flex rounded-full h-4 w-4 mr-2 ${
                  prioritas === "very-high" ? "bg-[#ED4C5C]" : prioritas === "high" ? "bg-[#F8A541]" : prioritas === "normal" ? "bg-[#00A790]" : prioritas === "low" ? "bg-[#428BC1]" : "bg-[#8942C1]"
                }`}
              ></div>
            )}

            {!prioritas && <>{props.priority}</>}
            {prioritas && <>{prioritas}</>}
            <svg className="ml-2 w-4 h-4 absolute right-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {openDropdown ? (
            <>
              <div id="dropdown" className="z-10 w-44 bg-white rounded border border-primary mt-2 ">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                  {priorityOption.map((el) => {
                    return (
                      <button className="py-2 px-4 flex hover:bg-slate-200 w-full cursor-pointer" data-cy="modal-edit-priority-input" value={el.value} key={el.value} onClick={() => setPrioritas(el.value, setOpenDropdwon(false))}>
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

          <div className="flex justify-end mt-6">
            {title === "" ? (
              <button disabled className="btn btn-primary py-3 px-9 text-white" data-cy="modal-add-save-button">
                Save
              </button>
            ) : (
              <label className="btn btn-primary py-3 px-9 text-white" type="submit" htmlFor="" data-cy="modal-add-save-button" onClick={() => editor(props.id)}>
                Save
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
