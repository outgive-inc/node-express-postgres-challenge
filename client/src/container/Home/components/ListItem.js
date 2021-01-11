import { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../../../hooks/useListProvider";

export default function ListItem({ children, id, completed, props }) {
  let { state, dispatch } = useContext(store);
  let { data } = state;

  let toggleCompleted = () => {
    console.log(id);
    fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        completed: !completed,
        ...props,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: "TOGGLE",
          state: id,
        });
      });
  };

  return (
    <li {...props}>
      <div className="block hover:bg-gray-50">
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-around">
              <div className="round mr-8">
                <input
                  type="checkbox"
                  id={`checkbox-${id}`}
                  checked={completed}
                  onChange={(e) => {
                    toggleCompleted();
                  }}
                />
                <label for={`checkbox-${id}`}></label>
              </div>
              <div>
                <Link
                  to={`/task/${id}`}
                  className="flex text-sm font-medium text-indigo-600 truncate"
                >
                  <p>{children}</p>
                </Link>
              </div>
            </div>
          </div>
          <button
            className="ml-5 flex-shrink-0 justify-self-end"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
                method: "DELETE",
                body: JSON.stringify({
                  id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((res) => {
                  dispatch({
                    type: "DELETE",
                    state: id,
                  });
                });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 text-gray-400 hover:text-red-600"
              data-todo-x-description="Heroicon name: chevron-right"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
