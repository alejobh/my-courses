/* eslint-disable @typescript-eslint/no-explicit-any */
const tempStorage: { [key: string]: any } = {};

const getValue = (key: string) => {
  let value;
  try {
    value = window.localStorage.getItem(key);
  } catch (e) {
    value = tempStorage[key];
  }

  return value && JSON.parse(value);
};

const setValue = <T>(key: string, value: T) => {
  const stringValue = JSON.stringify(value);
  try {
    window.localStorage.setItem(key, stringValue);
  } catch (e) {
    tempStorage[key] = stringValue;
  }
};

const removeValue = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    tempStorage[key] = undefined;
  }
};

export default {
  getValue,
  setValue,
  removeValue,
};
