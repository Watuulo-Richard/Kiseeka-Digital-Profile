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
    endDate:Date | undefined;
    setEndDate: (endDate: Date) => void;
    label?: React.ReactNode;
    id?: string;
    triggerClassName?: string;
}
export function EndDate({endDate, setEndDate, label = "Enter the date you completed your studies (leave blank if still studying)", id = "date", triggerClassName}:DateProps) {
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
            {endDate ? endDate.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            captionLayout="dropdown"
            onSelect={(endDate) => {
                if(endDate) {
                    setEndDate(endDate)
                    setOpen(false)
                }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
