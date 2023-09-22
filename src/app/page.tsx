"use client";
import Input from "@/components/ui/form/input";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  return (
    <main className="h-screen w-screen p-5">
      <div className="flex flex-col justify-center items-center">
        <div className="w-52 my-5">
          <Input
            value={date}
            onChange={(date: Dayjs) => setDate(date.format("YYYY-MM-DD"))}
          />
        </div>
        <p className="text-slate-700 font-semibold tracking-wider">
          Date : {dayjs(date).format("MMMM DD, YYYY")}
        </p>
      </div>
    </main>
  );
}
