const ERROR_MESSAGE = {
  require: "Giá trị không được bỏ trống",
  regex: "Vui lòng điền giá trị đúng",
  minMax: (min, max) => `Vui lòng điền số ký tự trong khoảng ${min}-${max}`,
  min: (min) => `Vui lòng điền số ký tự tối thiểu là ${min}`,
  max: (min) => `Vui lòng điền số ký tự tối đa là ${min}`,
  confirm: (field) => `Vui lòng điền giá trị giống ${field}`,
};

const REGEXP = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  website:
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  facebook:
    /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
};

export const validate = (rules = {}, form = {}) => {
  const errObj = {};

  for (const name in rules) {
    for (const rule of rules[name]) {
      if (rule.require) {
        if (
          (typeof form[name] === "boolean" && !form[name]) ||
          (typeof form[name] !== "boolean" && !form[name]?.trim())
        ) {
          errObj[name] = rule.message || ERROR_MESSAGE.require;
        }
      }

      if (typeof form[name] !== "boolean" && form[name]?.trim()) {
        if (rule.regex) {
          let regexp = rule.regex;

          if (regexp in REGEXP) {
            regexp = REGEXP[regexp];
          } else if (!(regexp instanceof RegExp)) {
            regexp = new RegExp();
          }
          if (!regexp.test(form[name]?.trim())) {
            errObj[name] = rule.message || ERROR_MESSAGE.regex;
          }
        }

        if (rule.min) {
          if (form[name]?.trim().length < rule.min) {
            errObj[name] = rule.message || ERROR_MESSAGE.min(rule.min);
          }
        }
        if (rule.max) {
          if (form[name]?.trim().length > rule.max) {
            errObj[name] = rule.message || ERROR_MESSAGE.max(rule.max);
          }
        }
        if (rule.min && rule.max) {
          if (
            form[name]?.trim().length < rule.min ||
            form[name]?.trim().length > max
          ) {
            errObj[name] =
              rule.message || ERROR_MESSAGE.minMax(rule.min, rule.max);
          }
        }

        if (rule.confirm) {
          if (form[rule.confirm] !== form[name]) {
            errObj[name] = rule.message || ERROR_MESSAGE.confirm;
          }
        }
      }
    }
  }

  return errObj;
};

export const require = ({
  require = true,
  message = ERROR_MESSAGE.require,
} = {}) => ({
  require,
  message,
});

export const regex = (regexPattern, message = ERROR_MESSAGE.regex) => ({
  regex: regexPattern,
  message,
});
export const min = (min, message) => {
  return {
    min,
    message,
  };
};
export const minMax = (min, max, message) => {
  return {
    min,
    max,
    message,
  };
};

export const confirm = (field, message) => ({
  confirm: field,
  message,
});
