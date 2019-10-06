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

// export const getName = ({ name }) =>
//   new Promise((resolve, reject) => {
//     authAPI
//       .get("/login", { name })
//       .then(response => {
//         const name = response.data.user.name;
//         resolve(name);
//       })
//       .catch(error => {
//         reject("PLAN FAILED", error);
//       });
//   });

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
        console.log("USER LOGGED OUT FROM THE SERVICE");
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
