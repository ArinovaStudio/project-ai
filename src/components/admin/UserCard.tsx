"use client"

import { Badge } from "@/components/ui/badge"

type Props = {
  name: string | null
  email: string
  role: string
  subscriptionTag: string
  onEdit?: () => void
}

export default function UserCard({
  name,
  email,
  role,
  subscriptionTag,
  onEdit,
}: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-medium truncate">
        {name ?? "Unnamed User"}
      </h3>

      <p className="text-sm text-muted-foreground truncate">
        {email}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <Badge variant="outline">{role}</Badge>
        <Badge variant={subscriptionTag === "FREE" ? "outline" : "default"}>
          {subscriptionTag}
        </Badge>
      </div>

      {onEdit && (
        <div className="mt-4 flex justify-end">
          {/* <button
            onClick={onEdit}
            className="text-sm text-primary hover:underline"
          >
            Edit
          </button> */}
        </div>
      )}
    </div>
  )
}
