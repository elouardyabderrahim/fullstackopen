import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

// const getAll = () => {
//   // const request = axios.get(URL);
//   console.log(axios.get("http://localhost:3001/persons").data);
//   return axios.get(URL).data;
// };
const getAll = async () => {
  const request = axios.get(baseUrl);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.log("error get all", error);
  }
};

const add = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  try {
    const response = await request;
    console.log("inside service", response.data);
    return response.data;
  } catch (error) {
    return console.log("error add", error);
  }
};

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  try {
    console.log("remove method", request);
    return request;
  } catch (error) {
    console.log("Remove method's error:", error);
  }
};
const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    return console.log("error update", error);
  }
};
// const update = async (id, newObject) => {
//   const request = await axios.put(`${baseUrl}/${id}`, newObject);
//   try {
//     request.then((response) => {
//       console.log("update method phone book", response.data);
//       return response.data;
//     });
//   } catch (error) {
//     console.log("PUT method error is :", error);
//   }
// };
export default {
  getAll,
  add,
  remove,
  update,
};
