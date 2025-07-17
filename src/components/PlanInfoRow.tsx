import React from "react"

interface PlanInfoRowProps {
  label: string
  value: string | React.ReactNode
  rightContent?: React.ReactNode
  className?: string
  showTopSpacing?: boolean
}

const PlanInfoRow: React.FC<PlanInfoRowProps> = ({
  label,
  value,
  rightContent,
  className = "",
  showTopSpacing = false,
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex justify-between items-center ${
          rightContent ? "" : "justify-start"
        }`}
      >
        <p className="text-sm">{label}</p>

        {rightContent && (
          <div className="flex-shrink-0 ml-2">{rightContent}</div>
        )}
      </div>

      <div className={`${showTopSpacing ? "mt-2 sm:mt-3" : "mt-1"}`}>
        <div className="text-sm break-words">{value}</div>
      </div>
    </div>
  )
}

export default PlanInfoRow
