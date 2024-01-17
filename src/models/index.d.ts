import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  COMPLETE = "COMPLETE"
}



type EagerFavoriteHost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FavoriteHost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly hostID: string;
  readonly customerID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFavoriteHost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FavoriteHost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly hostID: string;
  readonly customerID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FavoriteHost = LazyLoading extends LazyLoadingDisabled ? EagerFavoriteHost : LazyFavoriteHost

export declare const FavoriteHost: (new (init: ModelInit<FavoriteHost>) => FavoriteHost) & {
  copyOf(source: FavoriteHost, mutator: (draft: MutableModel<FavoriteHost>) => MutableModel<FavoriteHost> | void): FavoriteHost;
}

type EagerFavoriteMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FavoriteMeal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly mealID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFavoriteMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FavoriteMeal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly mealID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FavoriteMeal = LazyLoading extends LazyLoadingDisabled ? EagerFavoriteMeal : LazyFavoriteMeal

export declare const FavoriteMeal: (new (init: ModelInit<FavoriteMeal>) => FavoriteMeal) & {
  copyOf(source: FavoriteMeal, mutator: (draft: MutableModel<FavoriteMeal>) => MutableModel<FavoriteMeal> | void): FavoriteMeal;
}

type EagerBasketMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketMeal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly basketID: string;
  readonly mealID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBasketMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketMeal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly basketID: string;
  readonly mealID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BasketMeal = LazyLoading extends LazyLoadingDisabled ? EagerBasketMeal : LazyBasketMeal

export declare const BasketMeal: (new (init: ModelInit<BasketMeal>) => BasketMeal) & {
  copyOf(source: BasketMeal, mutator: (draft: MutableModel<BasketMeal>) => MutableModel<BasketMeal> | void): BasketMeal;
}

type EagerBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly BasketMeals?: (BasketMeal | null)[] | null;
  readonly customerID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly BasketMeals: AsyncCollection<BasketMeal>;
  readonly customerID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Basket = LazyLoading extends LazyLoadingDisabled ? EagerBasket : LazyBasket

export declare const Basket: (new (init: ModelInit<Basket>) => Basket) & {
  copyOf(source: Basket, mutator: (draft: MutableModel<Basket>) => MutableModel<Basket> | void): Basket;
}

type EagerOrderMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderMeal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly orderID: string;
  readonly mealID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrderMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderMeal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly orderID: string;
  readonly mealID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrderMeal = LazyLoading extends LazyLoadingDisabled ? EagerOrderMeal : LazyOrderMeal

export declare const OrderMeal: (new (init: ModelInit<OrderMeal>) => OrderMeal) & {
  copyOf(source: OrderMeal, mutator: (draft: MutableModel<OrderMeal>) => MutableModel<OrderMeal> | void): OrderMeal;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly OrderMeals?: (OrderMeal | null)[] | null;
  readonly request?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly OrderMeals: AsyncCollection<OrderMeal>;
  readonly request?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerFeaturedHost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FeaturedHost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Host?: Host | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly featuredHostHostId?: string | null;
}

type LazyFeaturedHost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FeaturedHost, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Host: AsyncItem<Host | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly featuredHostHostId?: string | null;
}

export declare type FeaturedHost = LazyLoading extends LazyLoadingDisabled ? EagerFeaturedHost : LazyFeaturedHost

export declare const FeaturedHost: (new (init: ModelInit<FeaturedHost>) => FeaturedHost) & {
  copyOf(source: FeaturedHost, mutator: (draft: MutableModel<FeaturedHost>) => MutableModel<FeaturedHost> | void): FeaturedHost;
}

type EagerFeaturedMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FeaturedMeal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Meal?: Meal | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly featuredMealMealId?: string | null;
}

type LazyFeaturedMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FeaturedMeal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Meal: AsyncItem<Meal | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly featuredMealMealId?: string | null;
}

export declare type FeaturedMeal = LazyLoading extends LazyLoadingDisabled ? EagerFeaturedMeal : LazyFeaturedMeal

export declare const FeaturedMeal: (new (init: ModelInit<FeaturedMeal>) => FeaturedMeal) & {
  copyOf(source: FeaturedMeal, mutator: (draft: MutableModel<FeaturedMeal>) => MutableModel<FeaturedMeal> | void): FeaturedMeal;
}

type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly meals?: (MealCategory | null)[] | null;
  readonly image?: string | null;
  readonly featured?: boolean | null;
  readonly featuredCountry?: boolean | null;
  readonly isCountry?: boolean | null;
  readonly isDiet?: boolean | null;
  readonly isRegion?: boolean | null;
  readonly isStyle?: boolean | null;
  readonly isPopular?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly meals: AsyncCollection<MealCategory>;
  readonly image?: string | null;
  readonly featured?: boolean | null;
  readonly featuredCountry?: boolean | null;
  readonly isCountry?: boolean | null;
  readonly isDiet?: boolean | null;
  readonly isRegion?: boolean | null;
  readonly isStyle?: boolean | null;
  readonly isPopular?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerReservation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly hostID: string;
  readonly Order?: Order | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly reservationOrderId?: string | null;
}

type LazyReservation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly hostID: string;
  readonly Order: AsyncItem<Order | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly reservationOrderId?: string | null;
}

export declare type Reservation = LazyLoading extends LazyLoadingDisabled ? EagerReservation : LazyReservation

export declare const Reservation: (new (init: ModelInit<Reservation>) => Reservation) & {
  copyOf(source: Reservation, mutator: (draft: MutableModel<Reservation>) => MutableModel<Reservation> | void): Reservation;
}

type EagerMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Meal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly hostID: string;
  readonly Categories?: (MealCategory | null)[] | null;
  readonly name: string;
  readonly description: string;
  readonly imageURI: string;
  readonly price: number;
  readonly plates: number;
  readonly time: string;
  readonly date: string;
  readonly allergens?: (string | null)[] | null;
  readonly ingredients?: (string | null)[] | null;
  readonly tags?: (string | null)[] | null;
  readonly available?: boolean | null;
  readonly OrderMeal?: (OrderMeal | null)[] | null;
  readonly BasketMeals?: (OrderMeal | null)[] | null;
  readonly FavoriteMeals?: (OrderMeal | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMeal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Meal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly hostID: string;
  readonly Categories: AsyncCollection<MealCategory>;
  readonly name: string;
  readonly description: string;
  readonly imageURI: string;
  readonly price: number;
  readonly plates: number;
  readonly time: string;
  readonly date: string;
  readonly allergens?: (string | null)[] | null;
  readonly ingredients?: (string | null)[] | null;
  readonly tags?: (string | null)[] | null;
  readonly available?: boolean | null;
  readonly OrderMeal: AsyncCollection<OrderMeal>;
  readonly BasketMeals: AsyncCollection<OrderMeal>;
  readonly FavoriteMeals: AsyncCollection<OrderMeal>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Meal = LazyLoading extends LazyLoadingDisabled ? EagerMeal : LazyMeal

export declare const Meal: (new (init: ModelInit<Meal>) => Meal) & {
  copyOf(source: Meal, mutator: (draft: MutableModel<Meal>) => MutableModel<Meal> | void): Meal;
}

type EagerCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Reservations?: (Reservation | null)[] | null;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly imageURI?: string | null;
  readonly address?: string | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly phone?: string | null;
  readonly Orders?: (Reservation | null)[] | null;
  readonly Baskets?: (Reservation | null)[] | null;
  readonly FavoriteMeals?: (Reservation | null)[] | null;
  readonly FavoriteHosts?: (Reservation | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Reservations: AsyncCollection<Reservation>;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly imageURI?: string | null;
  readonly address?: string | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly phone?: string | null;
  readonly Orders: AsyncCollection<Reservation>;
  readonly Baskets: AsyncCollection<Reservation>;
  readonly FavoriteMeals: AsyncCollection<Reservation>;
  readonly FavoriteHosts: AsyncCollection<Reservation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Customer = LazyLoading extends LazyLoadingDisabled ? EagerCustomer : LazyCustomer

export declare const Customer: (new (init: ModelInit<Customer>) => Customer) & {
  copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}

type EagerHost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Host, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Meals?: (Reservation | null)[] | null;
  readonly Reservations?: (Reservation | null)[] | null;
  readonly first_name: string;
  readonly last_name: string;
  readonly email?: string | null;
  readonly imageURI: string;
  readonly tags?: (string | null)[] | null;
  readonly description: string;
  readonly country: string;
  readonly address: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly FavoriteHosts?: (Reservation | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Host, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Meals: AsyncCollection<Reservation>;
  readonly Reservations: AsyncCollection<Reservation>;
  readonly first_name: string;
  readonly last_name: string;
  readonly email?: string | null;
  readonly imageURI: string;
  readonly tags?: (string | null)[] | null;
  readonly description: string;
  readonly country: string;
  readonly address: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly FavoriteHosts: AsyncCollection<Reservation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Host = LazyLoading extends LazyLoadingDisabled ? EagerHost : LazyHost

export declare const Host: (new (init: ModelInit<Host>) => Host) & {
  copyOf(source: Host, mutator: (draft: MutableModel<Host>) => MutableModel<Host> | void): Host;
}

type EagerMealCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MealCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly categoryId?: string | null;
  readonly mealId?: string | null;
  readonly category: Category;
  readonly meal: Meal;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMealCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MealCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly categoryId?: string | null;
  readonly mealId?: string | null;
  readonly category: AsyncItem<Category>;
  readonly meal: AsyncItem<Meal>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MealCategory = LazyLoading extends LazyLoadingDisabled ? EagerMealCategory : LazyMealCategory

export declare const MealCategory: (new (init: ModelInit<MealCategory>) => MealCategory) & {
  copyOf(source: MealCategory, mutator: (draft: MutableModel<MealCategory>) => MutableModel<MealCategory> | void): MealCategory;
}