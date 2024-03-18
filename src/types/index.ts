export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

export type NewUserType = {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

export type UpdatedUserType = {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  phone: string;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
};

export type AddItem = {
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  items: Item[];
};

export type ProductsType = {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
};

export type OrdersType = {
  id: string;
  time: string;
  amount: string;
  count: number;
  userId: string;
};

export type NewOrdersType = {
  userId: string;
  time: string;
  amount: string;
  count: number;
};
