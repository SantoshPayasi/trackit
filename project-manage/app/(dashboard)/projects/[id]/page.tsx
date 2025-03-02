"use client"

import React, { useState } from 'react'
import ProjectHeader from '../projectHeader'
import { useParams, useRouter } from 'next/navigation'
import Board from "../Board/page"
import ListView from '../ListView'
import TimeLine from '../TimelineView'
import TableView from "../TableView"
type Params = {
    id: string
}



export const Tab = {
    Board: "Board",
    TimeLine: "TimeLine",
    Table: "Table",
    List: "List"
}
const page = () => {

    const { id } = useParams<Params>()
    const [activeTab, setActiveTab] = useState(Tab.Board);
    const [isModelNewTaskOpen, setIsModelNewTaskOpen] = useState(false);


    return (
        <div>
            {/*MODEL TO ADD NEW TASK */}
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab == Tab.Board && (
                <Board id={id} setIsModelNewTaskOpen={setIsModelNewTaskOpen} />
            )}
            {
                activeTab == Tab.List && (
                    <ListView id={Number(id)} setIsModelNewTaskOpen={setIsModelNewTaskOpen} />
                )
            }
            {
                activeTab == Tab.TimeLine && (
                    <TimeLine id={Number(id)} setIsModelNewTaskOpen={setIsModelNewTaskOpen} />
                )
            }
            {
                activeTab == Tab.Table && (
                    <TableView id={Number(id)} setIsModelNewTaskOpen={setIsModelNewTaskOpen} />
                )
            }
        </div>
    )
}

export default page
