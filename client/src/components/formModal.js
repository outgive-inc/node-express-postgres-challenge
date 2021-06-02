import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const FormModal = ({ isOpen, setIsOpen, actionTodo, todo }) => {
  let initialState = {
    title: "",
    details: "",
  };
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    initialState = !!todo ? todo : initialState;

    setForm(initialState);
  }, [todo]);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.title) {
      actionTodo(form);

      setIsOpen(!isOpen);
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(!isOpen)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {todo ? "Update TODO" : "Create TODO"}
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={onSubmit}>
                    <div>
                      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-6 sm:col-span-6">
                            <label
                              htmlFor="todo"
                              className="block text-sm font-medium text-gray-700"
                            >
                              TODO
                            </label>
                            <input
                              required
                              type="text"
                              name="title"
                              id="title"
                              value={form.title}
                              onChange={handleChange}
                              className="p-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                              placeholder="Todo..."
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Details
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="details"
                              name="details"
                              value={form.details}
                              onChange={handleChange}
                              rows={7}
                              className="shadow-sm border-none resize-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                              placeholder="Type TODO details here"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="button"
                          className="inline-flex justify-center mr-3 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FormModal;
