"use client"
import Header from '@/components/Header'
import { useGetTasksQuery } from '@/state/task.api'
import React from 'react'
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Task } from '@/app/types/task.types'
import { dataGridClassname, dataGridSxStyles } from '@/libs/utils'
import { useSelector } from 'react-redux'

type props = {
    id: number
}

const TableView = ({ id }: props) => {
    const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: id })
    const isDarkMode = useSelector((state: any) => state.global.isDarkMode)
    const columns: GridColDef<Task>[] = [
        {
            field: "id",
            headerName: "ID",
            width: 100
        },
        {
            field: "title",
            headerName: "Title",
            width: 100
        },
        {
            field: "description",
            headerName: "Description",
            width: 200
        },
        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: (params) => (
                <span className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
                    {params.value}
                </span>
            )
        },
        {
            field: "priority",
            headerName: "Priority",
            width: 75
        },
        {
            field: "tags",
            headerName: "Tags",
            width: 130
        },
        {
            field: "startDate",
            headerName: "StartDate",
            width: 130
        },
        {
            field: "dueDate",
            headerName: "dueDate",
            width: 130
        },
        {
            field: "author",
            headerName: "Author Name",
            renderCell: (params) => params.value?.username || "Unknown",
            width: 130
        },
        {
            field: "assignee",
            headerName: "Author Name",
            renderCell: (params) => params.value.assigneee?.username || "Unknown",
            width: 130
        }
    ]




    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error occured during fetching the tasks</div>

    return (
        <div className=' w-full px-4 pb-8 xl:px-6'>
            <div className='pt-5'>
                <Header name="Table" />
            </div>
            <DataGrid
                rows={tasks}
                columns={columns}
                className={dataGridClassname}
                sx={dataGridSxStyles(isDarkMode)}
            />

        </div>
    )
}

export default TableView
