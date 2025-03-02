"use client"
import { Task } from '@/app/types/task.types'
import Image from 'next/image'
import React from 'react'
import { format } from "date-fns"
type TaskCardprops = {
    task: Task
}
const TaskCard = ({ task }: TaskCardprops) => {
    return (
        <div className='mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white'>
            {task.attachments && task.attachments.length > 0 && (
                <div className=''>
                    <strong>Attachments</strong>
                    <div className='flex flex-wrap'>
                        <Image
                            src={`/${task.attachments[0].fileURL}`}
                            alt={task.attachments[0].fileName}
                            width={400}
                            height={200}
                            className='h-auto w-full rounded-t-md'
                        />
                    </div>
                </div>
            )}
            <p>
                <strong>Title: </strong> {task.title}
            </p>
            <p>
                <strong>Description: </strong>  {task.description || "No description provided"}
            </p>
            <p>
                <strong>Status: </strong> {task.status}
            </p>
            <p>
                <strong>Priority: </strong> {task.priority}
            </p>
            <p>
                <strong>Tags: </strong> {task.tags}
            </p>
            <p>
                <strong>StartDate: </strong> {task.startDate ? format(new Date(task.startDate), 'P') : "No start date provided"}
            </p>
            <p>
                <strong>EndDate: </strong> {task.dueDate ? format(new Date(task.dueDate), 'P') : "No End date provided"}
            </p>
            <p>
                <strong>Authod: </strong> {task.author ? task.author.username : "Unknown"}
            </p>
            <p>
                <strong>Assignee: </strong> {task.assignee ? task.assignee.username : "Unassigned"}
            </p>

        </div>
    )
}

export default TaskCard
