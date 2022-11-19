import React, { useState } from "react";
import { Trash } from "react-bootstrap-icons";

const ItemTodo = (props, setData) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="flex bg-white w-full rounded-xl border border-gray-200 shadow-xl lg:px-10 px-4 py-8 mb-2 font-signika" data-cy="todo-add-button">
        <div className="flex flex-row justify-between items-center" data-cy="todo-item">
          <div className="inline-flex items-center gap-4">
            <input
              type="checkbox"
              data-cy="todo-item-checkbox"
              id={"checkbox-" + props.id}
              className="checkbox  outline-none checkbox-primary rounded-none"
              onChange={() => {
                props.status((props.id, props.is_active));
              }}
              checked={props.is_active === 0}
            />
            <div
              className={`inline-flex rounded-full h-4 w-4 ${
                props.priority === "very-high" ? "bg-[#ED4C5C]" : props.priority === "high" ? "bg-[#F8A541]" : props.priority === "normal" ? "bg-[#00A790]" : props.priority == "low" ? "bg-[#428BC1]" : "bg-[#8942C1]"
              }`}
            ></div>
            <p className={`text-md text-black ${props.is_active === 0 ? "line-through" : ""}`} data-cy="todo-item-checkbox">
              {props.title}
            </p>
            <label className={`cursor-pointer ${props.is_active === 0 ? "hidden" : ""}`} htmlFor={props.id}>
              📝
            </label>
            <label htmlFor="deltodo" onClick={() => props.setModal(true)} className="btn modal-button btn-circle btn-sm btn-outline btn-error absolute lg:right-24 right-6">
              <Trash />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemTodo;
