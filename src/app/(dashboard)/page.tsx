import InputArea from "@/components/InputArea";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-2">Hey! User</h1>
      <InputArea className="w-3xl" />
    </div>
  );
}
