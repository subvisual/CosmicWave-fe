import React from "react";
import Button from "./Button";

interface Props {
  modalIsOpen: boolean;
  setPlaylistName: (name: string) => void;
  commitPlaylist: () => void;
  closeModal: () => void;
}

const Modal = ({
  modalIsOpen,
  setPlaylistName,
  commitPlaylist,
  closeModal,
}: Props) => {
  if (modalIsOpen) {
    return (
      <div
        id="defaultModal"
        aria-hidden="true"
        className="fixed flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
      >
        <div
          className="h-full w-full bg-red absolute"
          onClick={closeModal}
        ></div>
        <div
          className="relative w-fit max-w-2xl max-h-full z-8"
          onClick={() => {}}
        >
          <div
            className="z-10 relative rounded-lg bg-black h-60 w-96 py-4  px-2 flex justify-center items-center"
            style={{
              boxShadow: "0px 0px 15px 2px rgba(255,255,255,0.3)",
            }}
          >
            <div className="flex flex-col gap-8 items-start justify-between w-full p-4 px-6 rounded-t border-gray-600">
              <span className="text-white text-center w-full">
                How do you wanna call it?
              </span>
              <input
                type="text"
                className="bg-transparent border border-[#424242] text-[#d9d9d9] text-sm rounded-lg focus:ring-slate-100 focus:border-slate-100 block w-full p-2.5"
                placeholder=""
                required
                onChange={(e) => {
                  setPlaylistName(e.target.value);
                }}
              />
              <Button
                type="button"
                extraClass="w-full bg-[#d9d9d9] w-full flex justify-center items-center"
                handleClick={commitPlaylist}
              >
                <span className="w-full text-center text-slate-900">
                  Create playlist
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
