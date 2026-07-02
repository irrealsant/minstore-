// frontend/src/components/ui/field.jsx
import * as React from "react"
import { cn } from "@/lib/utils"

function FieldGroup({ className, ...props }) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

function Field({ className, orientation = "vertical", ...props }) {
  return (
    <div
      data-slot="field"
      data-orientation={orientation}
      className={cn(
        "flex flex-col gap-2",
        orientation === "horizontal" && "flex-row items-center justify-between",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldError({ className, children, ...props }) {
  if (!children) return null
  return (
    <p
      data-slot="field-error"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  )
}

function FieldSeparator({ className, children, ...props }) {
  return (
    <div
      data-slot="field-separator"
      className={cn("relative flex items-center py-2", className)}
      {...props}
    >
      <div className="h-px flex-1 bg-border" />
      {children && (
        <span className="px-2 text-xs text-muted-foreground">{children}</span>
      )}
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

function FieldSet({ className, ...props }) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

function FieldLegend({ className, ...props }) {
  return (
    <legend
      data-slot="field-legend"
      className={cn("text-base font-semibold", className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
}

export {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSeparator,
  FieldSet,
  FieldLegend,
  FieldContent,
  FieldTitle,
}