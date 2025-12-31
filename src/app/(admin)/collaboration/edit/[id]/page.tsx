// src/app/(admin)/collaboration/edit/[id]/page.tsx
import { notFound } from "next/navigation";
import EditCollaborationPage from "@/app/(admin)/collaboration/edit/EditCollaborationPage";

type PageProps = {
  params: {
    id?: string;
  };
};

export default async function Page({ params }: PageProps) {
  if (!params?.id) {
    notFound(); // 👈 no crash, no stress
  }

  const res = await fetch(
    `/api/collaboration/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound(); // 👈 handles 404, invalid id, etc.
  }

  const collaboration = await res.json();

  return <EditCollaborationPage collaboration={collaboration} />;
}
