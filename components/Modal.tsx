"use client";
import { FormEvent, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypedRadioGroup from "./TaskTypedRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/20/solid";

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const [newTaskInput, setNewTaskInput, image, setImage, addTask, newTaskType] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.image,
      state.setImage,
      state.addTask,
      state.newTaskType,
    ]);
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10"
        onClose={closeModal}
        onSubmit={handleSubmit}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full mx-auto w-full max-w-md items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-wmd transform overflow-hidden rounded-2xl bg-white p-6 text-left aling-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 pb-2">
                  add task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Digite uma tarefa aqui"
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>
                <TaskTypedRadioGroup />

                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}
                    className="w-full border border-gray-300 rounded outiline-none p-5 focus-visible:ring-2  focus-visible:ring-blue-500"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    Envie a imagem
                  </button>

                  {image && (
                    <Image
                      alt="Imagem enviada"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter hover: grayscale transition-all duration-150 cursor-not-allowed"
                      src={URL.createObjectURL(image)}
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  )}
                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-ble-900 hover:bg-blue-300 focus:outile-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:text-gray-300 disabled:cursor-not-allowed">
                    Add Tarefa
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default Modal;
