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

export const verifyService = () =>
  new Promise((resolve, reject) => {
    authAPI
      .get("/verify")
      .then(response => {
        const user = response.data.user.user;
        console.log(
          "USER DATA SUCCES FROM verifyservice in auth",
          response.data.user
        );
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
