"use client"
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSideBarCollapsed } from '@/state'
import { useGetProjectsQuery } from '@/state/project.api'
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React, { useState } from 'react'

const SideBar = () => {
    const [showProjects, setShowProjects] = useState(true)
    const [showPriority, setShowPriority] = useState(false)

    const { data: projects } = useGetProjectsQuery();

    const dispatch = useAppDispatch();
    const isSideBarCollapsed = useAppSelector(state => state.global.isSideBarCollapsed)


    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300
                               h-full z-40 dark:bg-black  overflow-y-auto  bg-white ${isSideBarCollapsed ? "w-0" : "w-64"}`

    return (
        <div className={sidebarClassNames}>
            <div className='flex h-[100%] w-full flex-col justify-start'>
                <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
                    <div className='text-xl font-bold text-gray-800 dark:text-white'>
                        TRACKIT
                    </div>
                    {isSideBarCollapsed ? null : (<button className='py-3' onClick={() => dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))}>
                        <X className='h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white' />
                    </button>)}
                </div>
                {/*TEAM*/}
                <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
                    <Image src={"/logo.png"} width={40} height={40} alt='logo' />
                    <div>
                        <h3 className='text-md font-bold tracking-widest dark:text-gray-200 '>EDROH TEAM</h3>
                        <div className='mt-1 flex items-start gap-2'>
                            <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                            <p className='text-xs text-gray-500'>Private</p>
                        </div>
                    </div>
                </div>
                {/*SIDEBAR LINKS */}
                <nav className='z-10 w-full'>
                    <SideBarLinks href="/" icon={Home} label="Home" />
                    <SideBarLinks href="/timeline" icon={Briefcase} label="TimeLine" />
                    <SideBarLinks href="/search" icon={Search} label="Search" />
                    <SideBarLinks href="/settings" icon={Settings} label="Settings" />
                    <SideBarLinks href="/user" icon={User} label="User" />
                    <SideBarLinks href="/users" icon={Users} label="Teams" />
                </nav>
                {/* SIDEBAR Projects LINKS */}
                <button onClick={() => setShowProjects((prev) => !prev)}
                    className='flex w-full items-center justify-between px-8 py-3 text-gray-500'
                >
                    <span className=''>Projects</span>
                    {showProjects ? (<ChevronUp className='h-5 w-5' />) : (<ChevronDown className='h-5 w-5' />)}
                </button>

                {/* SHOW PROJECTS LISTS*/}
                {showProjects && projects?.map((project) => (
                    <SideBarLinks key={project.id} href={`/projects/${project.id}`} icon={Briefcase} label={project.name} />
                ))}


                {/*Priority LINKS */}
                <button onClick={() => setShowPriority((prev) => !prev)}
                    className='flex w-full items-center justify-between px-8 py-3 text-gray-500'
                >
                    <span className=''>Priority</span>
                    {showPriority ? (<ChevronUp className='h-5 w-5' />) : (<ChevronDown className='h-5 w-5' />)}
                </button>

                {
                    showPriority && (
                        <>
                            <SideBarLinks href="/priority/urgent" icon={AlertCircle} label="Urgent" />
                            <SideBarLinks href="/priority/high" icon={ShieldAlert} label="High" />
                            <SideBarLinks href="/priority/medium" icon={AlertTriangle} label="Medium" />
                            <SideBarLinks href="/priority/backlog" icon={AlertOctagon} label="Backlog" />
                        </>
                    )
                }

            </div>
        </div >
    )
}

interface SidebarLinkProps {
    href: string,
    icon: LucideIcon,
    label: string,
    // isCollapsed: boolean
}

const SideBarLinks = ({
    href,
    icon: Icon,
    label,
    // isCollapsed
}: SidebarLinkProps) => {
    const pathname = usePathname();

    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return <Link href={href} className='w-full'>
        <div className={`relative flex cursor-pointer items-center transition-colors
                    hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
            } justify-start px-8 py-3`}>
            {
                isActive && (
                    <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200"></div>
                )
            }

            <Icon className='h-5 w-5 mx-2 text-gray-800 dark:text-gray-100' />
            <span className='font-medium text-gray-800 dark:text-gray-100'>
                {label}
            </span>

        </div>
    </Link>

}

export default SideBar
