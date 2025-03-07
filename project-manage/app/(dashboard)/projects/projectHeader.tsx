"use client"
import React, { useEffect, useState } from 'react'
import { Tab } from '@/constants'
import Header from '@/components/Header'
import { Clock, Filter, Grid3x3, List, PlusSquare, Share2, Table } from 'lucide-react'
import ModelForNewProject from "./ModelForNewProject"
type Props = {
    activeTab: string,
    setActiveTab: (tabname: string) => void
}




const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {

    const [isModelNewProjectOpen, setIsModelNewProjectOpen] = useState(false);
    // const [isModelNewProjectOpen, setIsModelNewProjectOpen] = useState(false);

    const TabButtonMaps = {
        [Tab.Board]: {
            icon: <Grid3x3 className='h-5 w-5' />,
            name: Tab.Board,
        },
        [Tab.TimeLine]: {
            icon: <Clock className='h-5 w-5' />,
            name: Tab.TimeLine
        },
        [Tab.Table]: {
            icon: <Table className='h-5 w-5' />,
            name: Tab.Table
        },
        [Tab.List]: {
            icon: <List className='h-5 w-5' />,
            name: Tab.List
        }
    }

    return (
        <div className='px-4 xl:px-6 '>
            {/*MODEL FOR NEW PROJECT */}

            <ModelForNewProject
                isOpen={isModelNewProjectOpen}
                onClose={() => setIsModelNewProjectOpen(false)}
            />

            <div className='pb-6 pt-6 lg:pb-4 lg:pt-8'>
                <Header name='Product Design Development'
                    ButtonComponent={
                        <button className='flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
                            onClick={() => setIsModelNewProjectOpen(true)}
                        >
                            <PlusSquare className='mr-2 h-5 w-5' /> New Boards
                        </button>
                    }
                />
            </div>

            {/* TABS */}
            <div className='flex flex-wrap-reverse gap-2 border-y border-gray-200  pb-[8px] pt-2 dark:border-strok-dark md:items-center'>
                <div className='flex flex-1 items-center gap-2 md:gap-4'>
                    {
                        Object.values(TabButtonMaps).map(({ icon, name }) => (
                            <TabButton
                                key={name}
                                name={name}
                                icon={icon}
                                setActiveTab={setActiveTab}
                                activeTab={activeTab}
                            />
                        ))
                    }
                </div>
                <div className='flex items-center gap-2'>
                    <button className='text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300'>
                        <Filter className='h-5 w-5' />
                    </button>
                    <button className='text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300'>
                        <Share2 className='h-5 w-5' />
                    </button>
                    <div className='relative'>
                        <input type='text' placeholder='Search Task' className='rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white' />
                        <Grid3x3 className='absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500' />
                    </div>
                </div>
            </div>


        </div>
    )
}

type TabButtonProps = {
    name: string,
    icon: React.ReactNode,
    setActiveTab: (tabname: string) => void,
    activeTab: string
}

const TabButton = ({ name, activeTab, icon, setActiveTab }: TabButtonProps) => {

    useEffect(() => {
        console.log(name === activeTab)
    }, [setActiveTab])
    const isActive = activeTab === name;
    return (
        <button className={`relative flex items-center gap-2 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:-h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4
         ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""}
        `}
            onClick={() => setActiveTab(name)}
        >
            {icon}
            {name}
        </button>
    )
}

export default ProjectHeader
