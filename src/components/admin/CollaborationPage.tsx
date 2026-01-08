"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import GradientBg from "@/components/GradientBg";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  subscriptionTag: string;
};

type EditFormData = {
  name: string;
  email: string;
  role: string;
  subscriptionTag: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState<"ADMIN" | "USER">("USER");

  const [formData, setFormData] = useState<EditFormData>({
    name: "",
    email: "",
    role: "",
    subscriptionTag: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user", { credentials: "include" });
      const data = await res.json();
      setUsers(data.users);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) => u.role.toUpperCase() === roleFilter
  );

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email,
      role: user.role,
      subscriptionTag: user.subscriptionTag,
    });
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading users…</div>;
  }

  return (
    <>
      {/* Background (SAME as CollaborationPage) */}
      <GradientBg />

      {/* Foreground Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <h1 className="text-2xl font-bold">Users</h1>
          <span className="text-sm text-muted-foreground">
            Total: {filteredUsers.length}
          </span>
        </div>

        {/* Role Filters */}
        <div className="flex gap-2 px-6">
          {["ADMIN", "USER"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role as any)}
              className={`px-4 py-1.5 text-sm rounded-full border transition
                ${
                  roleFilter === role
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/60 dark:bg-white/5 backdrop-blur border-black/10 dark:border-white/10"
                }
              `}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Desktop Table */}
        <div
          className="
            hidden md:block mx-6 overflow-hidden
            rounded-xl border border-black/10 dark:border-white/10
            bg-[linear-gradient(135deg,rgba(255,255,255,0.85),rgba(255,255,255,0.6))]
            dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]
            backdrop-blur-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.18)]
          "
        >
          <table className="w-full text-sm">
            <thead className="border-b border-black/10 dark:border-white/10">
              <tr className="text-left text-muted-foreground">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Subscription</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <td className="px-6 py-4 font-medium">
                    {u.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {u.email}
                  </td>
                  <td className="px-6 py-4">{u.role}</td>
                  <td className="px-6 py-4">{u.subscriptionTag}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(u)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden px-6 space-y-4">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="
                rounded-xl p-4
                border border-black/10 dark:border-white/10
                bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.6))]
                dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))]
                backdrop-blur-xl
              "
            >
              <div className="font-medium">{u.name || "N/A"}</div>
              <div className="text-sm text-muted-foreground">{u.email}</div>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-primary/20">
                  {u.role}
                </span>
                <span className="px-2 py-1 rounded-full bg-green-500/20">
                  {u.subscriptionTag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div
              className="
                w-full max-w-md rounded-xl
                border border-black/10 dark:border-white/10
                bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,255,255,0.7))]
                dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))]
                backdrop-blur-xl
                p-6
              "
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit User</h2>
                <button onClick={() => setIsEditModalOpen(false)}>
                  <X />
                </button>
              </div>

              <form className="space-y-4">
                <Input value={formData.name} />
                <Input value={formData.email} />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Save</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
