"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateProps {
    className?:React.HTMLAttributes<HTMLDivElement>
    startDate:Date | undefined;
    setStartDate: (startDate: Date) => void;
    label?: React.ReactNode;
    id?: string;
    triggerClassName?: string;
}

export function StartDate({startDate, setStartDate, label = "Enter the date you started studying", id = "date", triggerClassName}:DateProps) {
  const [open, setOpen] = React.useState(false)
//   const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id} className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className={`w-48 justify-between font-normal ${triggerClassName ?? ""}`}
          >
            {/* The If statement or Ternary operator is used to conditionally display either the selected date (formatted as a string) or a placeholder text ("Select date") if no date has been chosen yet. */}
            {startDate ? startDate.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setStartDate(selectedDate)
                setOpen(false)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
