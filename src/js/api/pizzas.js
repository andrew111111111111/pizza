import { BASE_URL } from "../config.js";

export const createPizza = async (pizza) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(pizza),
  });
  if (!response.ok) throw new Error(`create error + ${response.statusText}`);
  return response.json();
};

export const getPizzas = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error(`get error + ${response.statusText}`);
  return response.json();
};
export const getPizza = async (id) => {
  const response = await fetch(BASE_URL + "/" + id);
  if (!response.ok) throw new Error(`get error + ${response.statusText}`);
  return response.json();
};

export const updatePizza = async (id, pizza) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(pizza),
  });
  if (!response.ok) throw new Error(`update error + ${response.statusText}`);
  return response.json();
};
export const deletePizza = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`delete error + ${response.statusText}`);
  console.log("pizza deleted id:", id);
};
