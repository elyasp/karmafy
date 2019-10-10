import axios from "axios";

const itemApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`
});

export const list = () => {
  return new Promise((resolve, reject) => {
    itemApi
      .get("/all")
      .then(response => {
        resolve(response.data.data.items);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadByType = typeItem => {
  return new Promise((resolve, reject) => {
    itemApi
      .get(`/${typeItem}`)
      .then(response => {
        resolve(response.data.data.item);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loadByUser = id => {
  return new Promise((resolve, reject) => {
    itemApi
      .get(`/byUser/${id}`)
      .then(response => {
        resolve(response.data.data.item);
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
        resolve(response.data.data.item);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const edit = (id, updatedItem) => {
  return new Promise((resolve, reject) => {
    itemApi
      .patch(`/item/${id}/edit`, updatedItem)
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const remove = data => {
  return new Promise((resolve, reject) => {
    itemApi
      .post(`/item/${data.itemId}`, data)
      .then(response => {
        resolve(response.data);
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
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
