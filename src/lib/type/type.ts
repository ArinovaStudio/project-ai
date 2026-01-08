export type AddressInfo = {
  id: string;
  Address1: string | null;
  Address2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  createdAt: string;
  updatedAt: string;
  zipCode: string | null;
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
  subscription: Subscription[];
  AddressInfo: AddressInfo[];
};


export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  duration: number;

  createdAt: string;
  updatedAt: string;
};

export type Subscription = {
  id: string;
  userId: string;
  planId: string;

  status: "ACTIVE" | "EXPIRED" | "CANCELLED"; // match enum
  startDate: string;
  endDate: string;

  createdAt: string;
  updatedAt: string;

  // Relations
  plan: SubscriptionPlan;
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
