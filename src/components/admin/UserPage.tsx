"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2, X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type User = {
    id: string
    name: string | null
    email: string
    role: string
    subscriptionTag: string
}

type EditFormData = {
    name: string
    email: string
    role: string
    subscriptionTag: string
}

export default function UserPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [formData, setFormData] = useState<EditFormData>({
        name: "",
        email: "",
        role: "",
        subscriptionTag: ""
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/user", {
                    credentials: "include",
                })

                if (!res.ok) {
                    throw new Error("Failed to fetch users")
                }

                const data = await res.json()
                setUsers(data.users)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const handleEdit = (userId: string) => {
        const user = users.find(u => u.id === userId)
        if (user) {
            setSelectedUser(user)
            setFormData({
                name: user.name || "",
                email: user.email,
                role: user.role,
                subscriptionTag: user.subscriptionTag
            })
            setIsEditModalOpen(true)
        }
    }

    const handleDelete = (userId: string) => {
        console.log("DELETE USER", userId)
        // Add confirmation dialog logic here
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Updating user", selectedUser?.id, formData)
        // Add API call to update user here
        setIsEditModalOpen(false)
    }

    const handleCloseModal = () => {
        setIsEditModalOpen(false)
        setSelectedUser(null)
    }

    if (loading) {
        return (
            <div className="p-6 text-gray-600">
                Loading users...
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between p-1">
                <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
                <div className="text-sm text-gray-600">
                    Total: {users.length}
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subscription
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user.name || "N/A"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-600">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {user.subscriptionTag}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button
                                        onClick={() => handleEdit(user.id)}
                                        className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="bg-white rounded-lg shadow p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">
                                    {user.name || "N/A"}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">{user.email}</div>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={() => handleEdit(user.id)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => handleDelete(user.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {user.role}
                            </span>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                {user.subscriptionTag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {users.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No users found
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
                            <Button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter email"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="moderator">Moderator</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="subscriptionTag" className="block text-sm font-medium text-gray-700 mb-1">
                                    Subscription
                                </label>
                                <select
                                    id="subscriptionTag"
                                    name="subscriptionTag"
                                    value={formData.subscriptionTag}
                                    onChange={handleFormChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="free">Free</option>
                                    <option value="basic">Basic</option>
                                    <option value="premium">Premium</option>
                                    <option value="enterprise">Enterprise</option>
                                </select>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <Button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}