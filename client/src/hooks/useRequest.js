import React, { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const { data } = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    } catch (err) {
      setErrors(
        <div
          class="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Holy Molly!</strong>
          <span class="block sm:inline">
            {" "}
            Something seriously bad happened.
          </span>
          <span class="absolute top-0 boclassName0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 classNameext-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setErrors(null)}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      );
      throw err;
    }
  };

  return { doRequest, errors };
};

export default useRequest;
