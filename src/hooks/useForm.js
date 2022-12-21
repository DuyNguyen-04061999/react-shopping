import { validate } from "@/utils/validate";
import { useState } from "react";

export const useForm = (rules, initialForm = {}) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);

  const register = (name, checkConfirm = false, min, confirm = false) =>
    checkConfirm && min
      ? {
          error: error[name],
          value: form[name] || "",
          onChange: (e) => {
            setForm({ ...form, [name]: e.target.value });
            setError({ ...error, [name]: "" });
            setDisabled(() =>
              e.target.value?.trim()?.length >= min ? false : true
            );
          },
        }
      : confirm
      ? {
          disabled,
          error: error[name],
          value: form[name] || "",
          onChange: (e) => {
            setForm({ ...form, [name]: e.target.value });
            setError({ ...error, [name]: "" });
          },
        }
      : {
          error: error[name],
          value: form[name] || "",
          onChange: (e) => {
            setForm({ ...form, [name]: e.target.value });
            setError({ ...error, [name]: "" });
          },
        };

  const _validate = () => {
    const errObj = validate(rules, form);
    setError(errObj);
    return Object.keys(errObj).length === 0;
  };

  const reset = () => {
    setForm({});
    setDisabled(true);
  };
  return {
    form,
    error,
    register,
    validate: _validate,
    reset,
    setForm,
    setError,
    errObj: error,
  };
};
