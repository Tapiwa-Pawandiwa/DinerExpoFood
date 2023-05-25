// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "COMPLETE": "COMPLETE"
};

const { FavoriteHost, FavoriteMeal, BasketMeal, Basket, OrderMeal, Order, FeaturedHost, FeaturedMeal, Category, Reservation, Meal, Customer, Host, MealCategory } = initSchema(schema);

export {
  FavoriteHost,
  FavoriteMeal,
  BasketMeal,
  Basket,
  OrderMeal,
  Order,
  FeaturedHost,
  FeaturedMeal,
  Category,
  Reservation,
  Meal,
  Customer,
  Host,
  MealCategory,
  OrderStatus
};