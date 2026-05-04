interface PropertyBadgeProps {
  icon: React.ReactNode
  label: string
}

export default function PropertyBadge({ icon, label }: PropertyBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-kiln-red">{icon}</span>
      <span className="font-body text-umber uppercase tracking-[0.1em] text-[10px]">
        {label}
      </span>
    </div>
  )
}
