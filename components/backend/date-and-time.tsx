'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateProps {
  publishedDateAndTime: Date;
  setPublishedDateAndTime: (publishedDateAndTime: Date) => void;
}

export function DateAndTime({
  publishedDateAndTime,
  setPublishedDateAndTime,
}: DateProps) {
  const [open, setOpen] = React.useState(false);
  // State to store the time input value
  // const [time, setTime] = React.useState<string>(
  //   publishedDateAndTime.toTimeString().slice(0, 8), // Initialize with current time
  // );
  // function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const newTime = e.target.value;
  //   setTime(newTime);
  //   // Update publishedDateAndTime with new time
  //   const [hours, minutes, seconds] = newTime.split(':');
  //   const newDate = new Date(publishedDateAndTime);
  //   newDate.setHours(
  //     parseInt(hours),
  //     parseInt(minutes),
  //     parseInt(seconds || '0'),
  //   );
  //   setPublishedDateAndTime(newDate);
  // }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {publishedDateAndTime
                ? publishedDateAndTime.toLocaleDateString()
                : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={publishedDateAndTime}
              captionLayout="dropdown"
              onSelect={(selected) => {
                setPublishedDateAndTime(selected || new Date());
                // if (!selected) {
                //   selected = new Date();
                // }
                // Combine selected date with current time
                // const [hours, minutes, seconds] = time.split(':');
                // selected.setHours(
                //   parseInt(hours),
                //   parseInt(minutes),
                //   parseInt(seconds || '0'),
                // );
                // setPublishedDateAndTime(selected);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          // value={time}
          // onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div> */}
    </div>
  );
}
// "use client"

// import * as React from "react"
// import { ChevronDownIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// interface DateProps {
//   publishedDateAndTime: Date
//   setPublishedDateAndTime: (publishedDateAndTime: Date) => void
// }

// export function DateAndTime({ publishedDateAndTime, setPublishedDateAndTime }: DateProps) {
//   const [open, setOpen] = React.useState(false)
//   const [time, setTime] = React.useState<string>(
//     publishedDateAndTime.toTimeString().slice(0, 8) // Initialize with current time
//   )

//   function handleDateSelect (selected: Date) {
//     // Use the selected date or fall back to current date
//     const newDate = new Date(selected)
//     const [hours, minutes, seconds] = time.split(":")
//     newDate.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds || "0"))
//     setPublishedDateAndTime(newDate)
//     setOpen(false)
//   }

//   const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = e.target.value
//     setTime(newTime)
//     const [hours, minutes, seconds] = newTime.split(":")
//     const newDate = new Date(publishedDateAndTime)
//     newDate.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds || "0"))
//     setPublishedDateAndTime(newDate)
//   }

//   return (
//     <div className="flex gap-4">
//       <div className="flex flex-col gap-3">
//         <Label htmlFor="date-picker" className="px-1">
//           Date
//         </Label>
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               id="date-picker"
//               className="w-32 justify-between font-normal"
//             >
//               {publishedDateAndTime.toLocaleDateString('en-US', { timeZone: 'Africa/Nairobi' })}
//               <ChevronDownIcon />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto overflow-hidden p-0" align="start">
//             <Calendar
//               mode="single"
//               selected={publishedDateAndTime}
//               captionLayout="dropdown"
//               required={true}
//               onSelect={handleDateSelect}
//             />
            
//           </PopoverContent>
//         </Popover>
//       </div>
//       <div className="flex flex-col gap-3">
//         <Label htmlFor="time-picker" className="px-1">
//           Time
//         </Label>
//         <Input
//           type="time"
//           id="time-picker"
//           step="1"
//           value={time}
//           onChange={handleTimeChange}
//           className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
//         />
//       </div>
//     </div>
//   )
// }