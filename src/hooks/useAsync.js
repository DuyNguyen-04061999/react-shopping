import { useReducer } from "react";

const initialState = {
  loading: false,
  error: null,
  status: "idle",
};

const SET_LOADING = "loading";
const SET_ERROR = "error";
const SET_STATUS = "status";

const reducerAsync = (state, { type, payload }) => {
  switch (type) {
    case SET_LOADING: {
      return { ...state, loading: payload };
    }
    case SET_ERROR: {
      return { ...state, error: payload };
    }
    case SET_STATUS: {
      return { ...state, status: payload };
    }

    default:
      throw new Error("Error with api");
  }
};

export const useAsync = (promise) => {
  const [{ loading, error, status }, dispatch] = useReducer(
    reducerAsync,
    initialState
  );

  const execute = async (...data) => {
    try {
      dispatch({ type: SET_STATUS, payload: "pending" });
      dispatch({ type: SET_LOADING, payload: true });

      const res = await promise(...data);

      dispatch({ type: SET_STATUS, payload: "fullfilled" });
      return res;
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
      dispatch({ type: SET_STATUS, payload: "error" });
      throw err;
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  return {
    loading,
    error,
    status,
    execute,
  };
};
