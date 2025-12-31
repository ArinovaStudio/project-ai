// components/admin/EditCollaborationPage.tsx
import CollaborationForm from "@/components/admin/CollaborationForm";
import type { CollaborationFormData } from "@/lib/type/CollaborationFormData";

export default function EditCollaborationPage({
  collaboration,
}: {
  collaboration: any;
}) {
  async function handleUpdate(data: CollaborationFormData) {
    await fetch(`/api/collaboration/${collaboration.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <CollaborationForm
        initialData={{
          title: collaboration.title,
          description: collaboration.description,
          budget: collaboration.budget,
          timeline: collaboration.timeline.split("T")[0],
        }}
        onSubmit={handleUpdate}
        onCancel={() => history.back()}
      />
    </div>
  );
}
