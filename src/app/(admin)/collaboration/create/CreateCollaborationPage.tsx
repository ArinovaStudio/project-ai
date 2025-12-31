"use client";

import CollaborationForm from "@/components/admin/CollaborationForm";
import type { CollaborationFormData } from "@/lib/type/CollaborationFormData";

export default function CreateCollaborationPage() {
  async function handleCreate(data: CollaborationFormData) {
    await fetch("/api/collaboration", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <CollaborationForm
        onSubmit={handleCreate}
        onCancel={() => history.back()}
      />
    </div>
  );
}