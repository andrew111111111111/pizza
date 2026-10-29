import {
  createPizza,
  getPizzas,
  updatePizza,
  deletePizza,
  getPizza,
} from "./api/pizzas.js";
import { createPizzaListMarkup } from "./create-pizza-lists.js";
import { modalSettings } from "./modal-settings.js";
import { modalPoster } from "./modal-create.js";

const pizzasContainer = document.querySelector("[data-pizzas-container]");

const renderPizzas = async () => {
  try {
    const pizzas = await getPizzas();
    const pizzaMarkup = await createPizzaListMarkup(pizzas);
    pizzasContainer.innerHTML = pizzaMarkup;
    const pizzaEditForms = document.querySelectorAll(
      '[data-pizza-action="edit"]',
    );
    pizzaEditForms.forEach((pizzaEditForm) => {
      pizzaEditForm.addEventListener("click", handleShowModal);
    });

    const pizzaDeleteForms = document.querySelectorAll("[data-delete-pizza]");

    pizzaDeleteForms.forEach((pizzaDeleteForm) => {
      pizzaDeleteForm.addEventListener("click", handleDeletePizzas);
    });
  } catch (error) {
    console.log(error);
  }
};

const handleShowModal = async (event) => {
  if (event.target.dataset.pizzaAction === "edit") {
    const id = event.target.closest("[data-pizza-id]").dataset.pizzaId;

    modalSettings.show();
    try {
      const pizza = await getPizza(id);
      const modal = modalSettings.element();
      const form = modal.querySelector("[data-form]");
      form.name.value = pizza.name;
      form.price.value = pizza.price;
      form.ingredients.value = pizza.ingredients.join(", ");
      await updatePizza(id, form);
    } catch (error) {
      console.error(error);
    }
  }
};

const handleDeletePizzas = async (event) => {
  try {
    if (event.target.dataset.pizzaAction === "delete") {
      const id = event.target.closest("[data-pizza-id]").dataset.pizzaId;
      console.log(id);

      try {
        await deletePizza(id);
      } catch (error) {
        console.log(error);
      }
      renderPizzas();
    }
  } catch (error) {
    console.log(error);
  }
};
const refresh = document.querySelector(".refresh");

const handleShowPosterModal = (event) => {
  event.preventDefault();
  try {
    modalPoster.show();
    const form = document.querySelector("[data-post-form]");
    form.addEventListener("submit", handlePostPizzas);
  } catch (error) {
    console.log(error);
  }
};

const handlePostPizzas = async (event) => {
  event.preventDefault();
  console.log("donned");
  const form = document.querySelector("[data-post-form]");
  try {
    const dataNewPizza = Object.fromEntries(new FormData(form));
    const savedPizza = await createPizza(dataNewPizza);

    form.reset();
    modalPoster.close();
    console.log(savedPizza);
  } catch (error) {
    console.log(error);
  }
};

refresh.addEventListener("click", handleShowPosterModal);
renderPizzas();
