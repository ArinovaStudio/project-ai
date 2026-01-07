import { LucideIcon } from "lucide-react";

export function SectionTitle({
  title,
  onEdit,
  EditIcon,
}: {
  title: string;
  onEdit?: () => void;
  EditIcon?: LucideIcon;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">{title}</h3>

      {onEdit && EditIcon && (
        <button
          onClick={onEdit}
          className="
            cursor-pointer
            rounded-lg p-2
            text-muted-foreground
            hover:text-foreground
            hover:bg-white/10
            transition
          "
        >
          <EditIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
