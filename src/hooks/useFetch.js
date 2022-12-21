import { useEffect, useReducer } from "react";

const initialState = {
  loading: true,
  data: null,
  error: null,
  status: "idle",
};

const SET_LOADING = "loading";
const SET_DATA = "data";
const SET_ERROR = "error";
const SET_STATUS = "status";

const reducerFetch = (state, { type, payload }) => {
  switch (type) {
    case SET_LOADING: {
      return { ...state, loading: payload };
    }
    case SET_DATA: {
      return { ...state, data: payload };
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
export const useFetch = (promise, dependencyList = []) => {
  const [{ loading, data, error, status }, dispatch] = useReducer(
    reducerFetch,
    initialState
  );
  useEffect(() => {
    fetchData();
  }, dependencyList);

  const fetchData = async () => {
    try {
      dispatch({ type: SET_STATUS, payload: "pending" });
      const res = await promise();
      res && dispatch({ type: SET_DATA, payload: res });
      dispatch({ type: SET_STATUS, payload: "fullfilled" });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
      dispatch({ type: SET_STATUS, payload: "error" });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  return {
    loading,
    data,
    error,
    status,
  };
};
