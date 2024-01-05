export const readyToSave = function (validators) {
  for (const validator of validators) {
    if (validator.condition()) {
      return { ready: false, msg: validator.msg };
    }
  }
  return { ready: true, msg: "" };
};
