"use client";

import { useState, useEffect } from "react";
import type { CollaborationFormData } from "@/lib/type/CollaborationFormData";

type Props = {
    initialData?: CollaborationFormData | null;
    onSubmit: (data: CollaborationFormData) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
};

export default function CollaborationForm({
    initialData,
    onSubmit,
    onCancel,
    loading = false,
}: Props) {
    const [form, setForm] = useState<CollaborationFormData>({
        title: "",
        description: "",
        budget: 0,
        timeline: "",
    });

    useEffect(() => {
        if (initialData) setForm(initialData);
    }, [initialData]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "budget" ? Number(value) : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit(form);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="
        w-full
        max-w-lg
        rounded-2xl
        bg-card
        text-card-foreground
        border
        border-border
        p-6
        shadow-lg
        space-y-6
      "
        >
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-xl font-semibold">
                    {initialData ? "Update Collaboration" : "Create Collaboration"}
                </h2>
                <p className="text-sm text-muted-foreground">
                    Fill in the details to {initialData ? "update" : "create"} a collaboration.
                </p>
            </div>

            {/* Title */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Website Redesign Project"
                    required
                    className="
            w-full
            rounded-md
            border
            border-border
            bg-background
            px-3
            py-2
            text-sm
            outline-none
            focus:ring-2
            focus:ring-ring
          "
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    value={form.description || ""}
                    onChange={handleChange}
                    placeholder="Briefly describe the scope and expectations"
                    rows={4}
                    className="
            w-full
            rounded-md
            border
            border-border
            bg-background
            px-3
            py-2
            text-sm
            outline-none
            focus:ring-2
            focus:ring-ring
          "
                />
            </div>

            {/* Budget + Timeline */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Budget</label>
                    <input
                        type="number"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        placeholder="Amount in USD"
                        required
                        className="
              w-full
              rounded-md
              border
              border-border
              bg-background
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-ring
            "
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Timeline</label>
                    <input
                        type="date"
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        required
                        className="
              w-full
              rounded-md
              border
              border-border
              bg-background
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-ring
            "
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="
            rounded-md
            border
            border-border
            px-4
            py-2
            text-sm
            text-muted-foreground
            hover:bg-muted
          "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="
            rounded-md
            bg-primary
            px-5
            py-2
            text-sm
            font-medium
            text-primary-foreground
            hover:opacity-90
            disabled:opacity-50
          "
                >
                    {loading ? "Saving..." : initialData ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}
