import axios from "axios";

const authAPI = axios.create({
  baseURL: "/"
});

export const registerService = ({ name, email, password }) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/register", { name, email, password })
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const logInService = ({ email, password }) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/login", { email, password })
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

//////////////////////

export const loggedIn = () =>
  new Promise((resolve, reject) => {
    authAPI
      .get("/loggedin")
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const logOutService = () =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/logout")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });

// export const uploadService = data =>
// new Promise((resolve, reject) => {
//   authAPI
//     .post("/upload", data)
//     .then(response => {
//       const user = response.data.user;
//       resolve(user);
//     })
//     .catch(error => {
//       reject(error);
//     });
// });
