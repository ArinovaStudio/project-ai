"use client";

import { useState } from "react";
import CollaborationForm from "@/components/admin/CollaborationForm";
import type { CollaborationFormData } from "@/lib/type/CollaborationFormData";

const mockData = [
  {
    id: "1",
    title: "Website Redesign",
    description: "UI overhaul",
    budget: 5000,
    timeline: "2026-01-15",
  },
  {
    id: "2",
    title: "Mobile App",
    description: "React Native build",
    budget: 8000,
    timeline: "2026-02-01",
  },
];

export default function CollaborationPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] =
    useState<CollaborationFormData | null>(null);

  async function handleCreate(data: CollaborationFormData) {
    // console.log("CREATE", data);
    setShowForm(false);
  }

  async function handleUpdate(data: CollaborationFormData) {
    // console.log("UPDATE", data);
    setShowForm(false);
    setEditingData(null);
  }

  return (
    <div className="relative p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Collaborations</h1>

        <button
          onClick={() => {
            setEditingData(null);
            setShowForm(true);
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm
          text-primary-foreground hover:opacity-90"
        >
          Create
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockData.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-border bg-card p-4
            shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setEditingData({
                    title: item.title,
                    description: item.description,
                    budget: item.budget,
                    timeline: item.timeline,
                  });
                  setShowForm(true);
                }}
                className="text-sm text-primary hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {showForm && (
        <div className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/60 backdrop-blur-md
        ">
          <CollaborationForm
            initialData={editingData}
            onSubmit={editingData ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingData(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
