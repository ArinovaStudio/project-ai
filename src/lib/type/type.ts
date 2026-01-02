export type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  subscriptionTag: string;
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
