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
            <label htmlFor={`delete${props.id}`} onClick={() => setModal(true)} className="btn modal-button btn-circle btn-sm btn-outline btn-error absolute lg:right-24 right-6">
              <Trash />
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id={`delete${props.id}`} className={modal ? "modal-toggle" : "hidden"} />
      <label htmlFor={`delete${props.id}`} className="modal cursor-pointer">
        <label className="modal-box relative bg-white" htmlFor="" data-cy="todo-item-delete-button">
          <div className="text-center text-7xl mb-5">⚠️</div>
          <h3 className="text-lg text-center">Apakah anda yakin menghapus activity?</h3>
          <h3 className="font-bold text-lg text-center">"{props.title}"</h3>
          <div className="modal-action grid grid-cols-2 px-10">
            <label onClick={() => setModal(false)} className="btn bg-slate-400 border-none hover:bg-slate-500 text-black rounded-full" data-cy="modal-delete-cancel-button">
              Batal
            </label>
            <label htmlFor={`information${props.id}`} className="btn bg-red-500 border-none hover:bg-red-600 text-white rounded-full" onClick={() => props.del(props.id, setModal(false))} data-cy="modal-delete-confirm-button">
              Hapus
            </label>
          </div>
        </label>
      </label>
      <input type="checkbox" id={`information${props.id}`} className="modal-toggle" data-cy="modal-information" />
      <label htmlFor={`information${props.id}`} className="modal cursor-pointer" data-cy="modal-information">
        <label className="modal-box relative  bg-white" htmlFor="">
          <h3 className="text-lg">
            <span>✔️</span> "{props.title}" Berhasil dihapus
          </h3>
        </label>
      </label>
    </>
  );
};

export default ItemTodo;
