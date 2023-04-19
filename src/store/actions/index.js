export const SET_FILE = "SET_FILE"
export const SET_TOKEN = "SET_TOKEN"

import { USER_UPDATE, USER_RESET } from "..";

export const AuthToken = (auth) => ({
  type: SET_TOKEN,
  payload: auth,
});

export const SetFile = (file) => {
  return {
    type: SET_FILE,
    payload: file
  };
};