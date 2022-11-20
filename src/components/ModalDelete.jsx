import React from "react";

const ModalDelete = (item) => {
  return (
    <div>
      <input type="checkbox" id="deltodo" data-cy="todo-item-delete-button" className={item.show ? "modal-toggle" : "hidden"} />
      <label htmlFor="deltodo" className="modal cursor-pointer" data-cy="todo-item-delete-button" id={item.id}>
        <label className="modal-box relative bg-white" htmlFor="">
          <div className="text-center text-7xl mb-5">⚠️</div>
          <h3 className="text-lg text-center">Apakah anda yakin menghapus activity?</h3>
          <h3 className="font-bold text-lg text-center">"{item.title}"</h3>
          <div className="modal-action grid grid-cols-2 px-10">
            <label htmlFor="deltodo" className="btn bg-slate-400 border-none hover:bg-slate-500 text-black rounded-full" data-cy="modal-delete-cancel-button">
              Batal
            </label>
            <label htmlFor="deltodo" className="btn bg-red-500 border-none hover:bg-red-600 text-white rounded-full" onClick={() => item.del(item.id, item.show1(false))} data-cy="modal-delete-confirm-button">
              Hapus
            </label>
          </div>
        </label>
      </label>
      <input type="checkbox" id="infotodo" className="modal-toggle" data-cy="modal-information" />
      <label htmlFor="infotodo" className="modal cursor-pointer" data-cy="modal-information">
        <label className="modal-box relative  bg-white" htmlFor="">
          <h3 className="text-lg">
            <span>✔️</span> "{item.title}" Berhasil dihapus
          </h3>
        </label>
      </label>
    </div>
  );
};

export default ModalDelete;
