export type AddressInfo = {
  id: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;

  name: string | null;
  email: string;
  image: string | null;

  role: string;
  subscriptionTag: string;

  phoneNumber: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  bio: string | null;

  createdAt: string;
  updatedAt: string;

  // Relations
  subscription: unknown[];     // or Subscription[] if typed
  AddressInfo: AddressInfo[];   // IMPORTANT: array, not object
};

export type Message = {
  id: string
  role: "user" | "bot"
  content: string
}

export type Chat = {
  id: string
  title: string
  messages: Message[]
  date: string
}
