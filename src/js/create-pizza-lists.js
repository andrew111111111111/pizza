import Handlebars from "handlebars";
import pizzasTemplate from "bundle-text:../hbs/pizzas-template.hbs";

export const createPizzaListMarkup = async (data) => {
  const getPizzasMarkup = Handlebars.compile(pizzasTemplate);
  const pizzasMarkup = getPizzasMarkup(data);
  return pizzasMarkup;
};
