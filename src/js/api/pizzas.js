import { BASE_URL } from "../config";

// Отримати всі піци
export const getPizzas = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`Помилка: ${response.status}`);
    const pizzas = await response.json();
    return pizzas;
  } catch (error) {
    console.error("Не вдалося отримати піци:", error);
    return [];
  }
};

// Додати нову піцу
export const createPizza = async (pizza) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pizza),
    });
    if (!response.ok) throw new Error(`Помилка: ${response.status}`);
    const newPizza = await response.json();
    return newPizza;
  } catch (error) {
    console.error("Не вдалося створити піцу:", error);
    return {};
  }
};

// Оновити піцу
export const updatePizza = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Помилка: ${response.status}`);
    const updatedPizza = await response.json();
    return updatedPizza;
  } catch (error) {
    console.error("Не вдалося оновити піцу:", error);
    return {};
  }
};

// Видалити піцу
export const deletePizza = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`Помилка: ${response.status}`);
    console.log(`Піцу з id ${id} видалено`);
  } catch (error) {
    console.error("Не вдалося видалити піцу:", error);
  }
};
