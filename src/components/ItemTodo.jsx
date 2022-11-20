import React, { useState } from "react";
import { Trash } from "react-bootstrap-icons";

const ItemTodo = (item, setStatus, setData) => {
  const [modal, setModal] = useState(false);
  const handleDel = (event) => {
    setData({
      id: item.id,
      title: item.title,
      route: "list item",
    });

    event.stopPropagation();
  };

  const handleEdit = (event) => {
    setData({
      id: item.id,
      title: item.title,
      priority: item.priority,
      edit: true,
    });

    event.stopPropagation();
  };
  return (
    <>
      <div className="flex bg-white w-full rounded-xl border border-gray-200 shadow-xl lg:px-10 px-4 py-8 mb-2 font-signika" data-cy="todo-add-button">
        <div className="flex flex-row justify-between items-center">
          <div className="inline-flex items-center gap-4" data-cy="todo-item">
            <input
              type="checkbox"
              data-cy="todo-item-checkbox"
              id={"checkbox-" + item.id}
              className="checkbox  outline-none checkbox-primary rounded-none"
              onChange={() => {
                setStatus((item.id, item.is_active));
              }}
              checked={item.is_active === 0}
            />
            <div
              className={`inline-flex rounded-full h-4 w-4 ${
                item.priority === "very-high" ? "bg-[#ED4C5C]" : item.priority === "high" ? "bg-[#F8A541]" : item.priority === "normal" ? "bg-[#00A790]" : item.priority == "low" ? "bg-[#428BC1]" : "bg-[#8942C1]"
              }`}
            ></div>
            <p className={`text-md text-black ${item.is_active === 0 ? "line-through" : ""}`} data-cy="todo-item-title">
              {item.title}
            </p>
            <label className={`cursor-pointer ${item.is_active === 0 ? "hidden" : ""}`} htmlFor={item.id}>
              📝
            </label>
            <label htmlFor="deltodo" onClick={() => item.show(true)} className="btn modal-button btn-circle btn-sm btn-outline btn-error absolute lg:right-24 right-6" data-cy="todo-item-delete-button">
              <Trash />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemTodo;
