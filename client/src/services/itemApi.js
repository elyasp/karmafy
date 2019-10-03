import axios from "axios";

const itemApi = axios.create({
  baseURL: "/"
});

export const list = () => {
  return new Promise((resolve, reject) => {
    itemApi
      .get("/")
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const load = id => {
  return new Promise((resolve, reject) => {
    itemApi
      .get(`/item/${id}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const edit = (id, updatedItem) => {
  return new Promise((resolve, reject) => {
    itemApi
      .patch(`/item/${id}`, updatedItem)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const remove = id => {
  return new Promise((resolve, reject) => {
    itemApi
      .delete(`/item/${id}`)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const add = itemData => {
  return new Promise((resolve, reject) => {
    itemApi
      .post("/item/add", itemData)
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
