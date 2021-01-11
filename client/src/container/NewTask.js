import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Container from "../components/Container";
import { store } from "../hooks/useListProvider";
export default function NewTask() {
  let { dispatch } = useContext(store);
  let [title, setTitle] = useState("");
  let [details, setDetails] = useState("");
  let history = useHistory();
  let createTask = async () => {
    fetch("http://localhost:3001/api/v1/tasks", {
      method: "POST",
      body: JSON.stringify({
        title,
        details,
        complete: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: "ADD",
          state: res.data,
        });
        history.push("/");
      });
  };
  useEffect(() => {
    return () => {
      setTitle("");
      setDetails("");
    };
  }, []);

  return (
    <Container>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={(e) => {
          e.preventDefault();
          createTask();
        }}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    type="text"
                    name="title"
                    id="title"
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Details
                </label>
                <div className="mt-1">
                  <textarea
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                    }}
                    id="details"
                    name="details"
                    rows="3"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link
              to="/"
              as="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create task
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
}
