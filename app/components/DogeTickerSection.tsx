"use client"

import { useEffect, useState } from "react"
import { fetchDogeTasks, type DogeTaskItem } from "@/lib/notion-morphic"

const fallbackTasks: DogeTaskItem[] = [
  {
    id: "fallback-1",
    title: "Task feed loading",
    accomplishment: "Preparing latest 5 accomplishments from Notion",
    date: "",
  },
]

export default function DogeTickerSection() {
  const [tasks, setTasks] = useState<DogeTaskItem[]>(fallbackTasks)

  useEffect(() => {
    let isMounted = true

    const fetchTasks = async () => {
      try {
        const mapped = await fetchDogeTasks(5)

        if (isMounted && mapped.length > 0) {
          setTasks(mapped)
        }
      } catch (error) {
        console.error("Failed to load DOGE tasks ticker:", error)
      }
    }

    fetchTasks()

    return () => {
      isMounted = false
    }
  }, [])

  const points = tasks.length > 0 ? tasks : fallbackTasks

  return (
    <section aria-label="Recent accomplishment memo" className="relative z-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="rounded-md border border-primary-cyan/40 bg-black/50 p-5 text-primary-cyan">
          <p className="mb-3 font-mono text-sm uppercase tracking-wider">Dear Elon,</p>
          <p className="mb-3 text-sm text-gray-300">Here are my 5 points:</p>
          <ul className="list-disc space-y-2 pl-6 text-sm text-white">
            {points.slice(0, 5).map((task, index) => (
              <li key={task.id || `${task.title}-${index}`}>
                {task.date ? <span className="text-primary-cyan">{`[${task.date}] `}</span> : null}
                <span className="font-semibold">{task.title}</span>
                {task.accomplishment ? ` - ${task.accomplishment}` : ""}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-300">
            Thanks,
            <br />
            Darcy
          </p>
          <div className="mt-2 text-xs text-gray-500">
            (Humor mode enabled. Productivity unchanged.)
          </div>
        </div>
      </div>
    </section>
  )
}
