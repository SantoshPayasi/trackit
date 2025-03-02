// "use client"
// import { useAppSelector } from '@/app/redux'
// import { useGetTasksQuery } from '@/state/task.api'
// import React, { useMemo, useState } from 'react'
// import { DisplayOption, Gantt, Task, ViewMode } from "gantt-task-react"
// type props = {
//     id: number,
//     setIsModelNewTaskOpen: (isOpen: boolean) => void
// }

// type TaskTypeItems = "task" | "milestone" | "project"

// const TimeLine = ({ id, setIsModelNewTaskOpen }: props) => {

//     const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

//     const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) })

//     const [displayOptions, setDisplayOptions] = useState<DisplayOption>(
//         {
//             viewMode: ViewMode.Month,
//             locale: "en-US",
//         }
//     )

//     const ganttTasks = useMemo(() => {
//         return (
//             tasks?.map((task) => ({
//                 start: new Date(task.startDate),
//                 end: new Date(task.dueDate),
//                 name: task.title,
//                 id: `Task-${task.id}`,
//                 type: "task" as TaskTypeItems,
//                 progress: task?.points ? (task.points / 10) * 100 : 0,
//                 isDisabled: false
//             })) || []
//         )
//     }, [tasks])

//     const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setDisplayOptions(prev => ({
//             ...prev,
//             viewMode: event.target.value as ViewMode
//         }))
//     }

//     if (isLoading) return <div>Loading...</div>
//     if (error) return <div>Error occured during fetching the tasks</div>


//     return (
//         <div className='px-4 xl:px-6'>
//             <div className='flex flex-wrap items-center justify-between gap-2 py-5'>
//                 <h1 className="me-2 text-lg font-bold dark:text-white">Project Task TimeLine</h1>
//                 <div className='relative inline-block w-64'>
//                     <select className='focus:shadow-outline block w-full appearance-none rounded border border-gray-100 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white '
//                         value={displayOptions.viewMode}
//                         onChange={handleViewModeChange}
//                     >
//                         <option value={ViewMode.Day}>Day</option>
//                         <option value={ViewMode.Week}>Week</option>
//                         <option value={ViewMode.Month}>Month</option>
//                     </select>
//                 </div>
//             </div>
//             <div className='overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white'>
//                 <div className='timeline'>
//                     <Gantt
//                         tasks={ganttTasks}
//                         {...displayOptions}
//                         columnWidth={displayOptions.viewMode === ViewMode.Day ? 150 : 100}
//                         listCellWidth='100px'
//                         barBackgroundColor={`${isDarkMode ? "#101214" : "#aeb8c2"}`}
//                         barBackgroundSelectedColor={`${isDarkMode ? "#000" : "#9ba11e6"}`}
//                     />
//                 </div>
//                 <div className='px-4 pb-5 pt-1'>
//                     <button className='flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
//                         onClick={() => setIsModelNewTaskOpen(true)}>Add New Task</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TimeLine
"use client"

import { useAppSelector } from '@/app/redux'
import { Task, Status as TaskStatus } from '@/app/types/task.types'
import { useGetTasksQuery } from '@/state/task.api'
import React, { useMemo, useState, useEffect } from 'react'

type TaskTypeItems = "task" | "milestone" | "project"

type Props = {
    id: number,
    setIsModelNewTaskOpen: (isOpen: boolean) => void
}

const ProjectTimeline = ({ id, setIsModelNewTaskOpen }: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) });

    const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Month');
    const [selectedTask, setSelectedTask] = useState<number | null>(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Animation effect
    useEffect(() => {
        // Trigger entrance animation after component mounts
        setTimeout(() => setIsAnimated(true), 100);

        // Check for mobile viewport
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Transform API tasks to our format
    const formattedTasks = useMemo(() => {
        if (!tasks) return [];

        return tasks.map((task: Task) => ({
            id: task.id,
            title: task.title,
            startDate: task.startDate,
            endDate: task.dueDate,
            status: getTaskStatus(task.status || 'To Do'),
            owner: task.assignee?.username || 'Unassigned',
            avatar: task.assignee?.profilePictureUrl || '/api/placeholder/40/40',
            progress: task.points ? (task.points / 10) * 100 : 0,
            description: task.description || 'No description available'
        }));
    }, [tasks]);

    // Helper function to determine task status based on points
    function getTaskStatus(status: string) {
        if (status === TaskStatus.ToDo) return 'not-started';
        if (status === TaskStatus.Done) return 'completed';
        if (status === TaskStatus.InProgress) return 'in-progress';
        return 'not-started';
    }

    // Calculate timeline parameters
    const allDates = formattedTasks.flatMap(task => [new Date(task.startDate), new Date(task.endDate)]);

    // Handle empty data
    const minDate = allDates.length > 0
        ? new Date(Math.min(...allDates.map(d => d.getTime())))
        : new Date();
    const maxDate = allDates.length > 0
        ? new Date(Math.max(...allDates.map(d => d.getTime())))
        : new Date(new Date().setMonth(new Date().getMonth() + 1));

    // Ensure we have at least a month view if no tasks
    if (formattedTasks.length === 0) {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1);
    }

    // Calculate total days in timeline
    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Calculate position and width for each task
    const getTaskPosition = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const startOffset = Math.ceil((start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
        const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const startPercent = (startOffset / totalDays) * 100;
        const widthPercent = (duration / totalDays) * 100;

        return {
            left: `${startPercent}%`,
            width: `${widthPercent}%`
        };
    };

    // Generate time markers based on view mode
    const generateTimeMarkers = () => {
        const markers = [];
        const currentDate = new Date(minDate);

        if (viewMode === 'Month') {
            // Month view
            currentDate.setDate(1); // Start at the beginning of the month

            while (currentDate <= maxDate) {
                const month = currentDate.toLocaleString('default', { month: 'short' });
                const year = currentDate.getFullYear();
                const offset = Math.max(0, (currentDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
                const position = (offset / totalDays) * 100;

                markers.push({
                    label: `${month} ${year}`,
                    position: `${position}%`
                });

                // Move to next month
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        } else if (viewMode === 'Week') {
            // Week view
            const dayOfWeek = currentDate.getDay();
            currentDate.setDate(currentDate.getDate() - dayOfWeek); // Start at beginning of week

            while (currentDate <= maxDate) {
                const weekNum = Math.ceil((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
                const offset = Math.max(0, (currentDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
                const position = (offset / totalDays) * 100;

                markers.push({
                    label: `Week ${weekNum}`,
                    position: `${position}%`
                });

                // Move to next week
                currentDate.setDate(currentDate.getDate() + 7);
            }
        } else {
            // Day view
            while (currentDate <= maxDate) {
                const day = currentDate.getDate();
                const month = currentDate.toLocaleString('default', { month: 'short' });
                const offset = Math.max(0, (currentDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
                const position = (offset / totalDays) * 100;

                markers.push({
                    label: `${day} ${month}`,
                    position: `${position}%`
                });

                // Move to next day
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        return markers;
    };

    const timeMarkers = generateTimeMarkers();

    // Get status color with dark mode support
    const getStatusColor = (status: string) => {
        if (isDarkMode) {
            switch (status) {
                case 'completed': return 'bg-emerald-600';
                case 'in-progress': return 'bg-indigo-600';
                case 'not-started': return 'bg-gray-600';
                default: return 'bg-gray-600';
            }
        } else {
            switch (status) {
                case 'completed': return 'bg-emerald-500';
                case 'in-progress': return 'bg-indigo-500';
                case 'not-started': return 'bg-slate-400';
                default: return 'bg-slate-400';
            }
        }
    };

    // Get status color for badges with dark mode support
    const getStatusBadgeColor = (status: string) => {
        if (isDarkMode) {
            switch (status) {
                case 'completed': return 'bg-emerald-900 text-emerald-100';
                case 'in-progress': return 'bg-indigo-900 text-indigo-100';
                case 'not-started': return 'bg-gray-800 text-gray-100';
                default: return 'bg-gray-800 text-gray-100';
            }
        } else {
            switch (status) {
                case 'completed': return 'bg-emerald-100 text-emerald-800';
                case 'in-progress': return 'bg-indigo-100 text-indigo-800';
                case 'not-started': return 'bg-slate-100 text-slate-800';
                default: return 'bg-slate-100 text-slate-800';
            }
        }
    };

    const StatusLabel = ({ status }: { status: string }) => {
        const labels = {
            'completed': 'Completed',
            'in-progress': 'In Progress',
            'not-started': 'Not Started'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(status)}`}>
                {labels[status as keyof typeof labels] || 'Unknown'}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setViewMode(event.target.value as 'Day' | 'Week' | 'Month');
    };

    if (isLoading) return (
        <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-dark-secondary rounded-xl shadow-lg">
            <div className="animate-pulse flex flex-col space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
        </div>
    );

    if (error) return (
        <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-dark-secondary rounded-xl shadow-lg">
            <div className="text-red-500 dark:text-red-400">
                <h3 className="text-lg font-semibold">Error loading timeline</h3>
                <p>An error occurred while fetching the tasks. Please try again later.</p>
            </div>
        </div>
    );

    return (
        <div className={`max-w-full mx-auto overflow-hidden transition-all duration-500 rounded-xl shadow-lg ${isDarkMode ? 'bg-dark-secondary text-white' : 'bg-white'}`}>
            {/* Header with Controls */}
            <div className={`p-4 md:p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r text-black'}`}>
                <div className="flex flex-wrap md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-xl md:text-2xl font-bold dark:text-white">Project Task Timeline</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative inline-block w-64">
                            <select
                                className={`block w-full appearance-none rounded border px-4 py-2 pr-8 leading-tight focus:outline-none focus:shadow-outline ${isDarkMode
                                    ? 'border-dark-secondary bg-dark-secondary text-white'
                                    : 'border-gray-100 bg-white hover:border-gray-500 text-black'
                                    }`}
                                value={viewMode}
                                onChange={handleViewModeChange}
                            >
                                <option value="Day">Day</option>
                                <option value="Week">Week</option>
                                <option value="Month">Month</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6 border rounded">
                <div className={`overflow-x-auto ${isMobile ? 'pb-6' : ''}`}>
                    <div className="min-w-full" style={{ minWidth: '768px' }}>
                        {/* Timeline Header */}
                        <div className="relative h-10 mb-6 border-b border-gray-200 dark:border-gray-700">
                            {timeMarkers.map((marker, idx) => (
                                <div
                                    key={idx}
                                    className="absolute bottom-0 transform -translate-x-1/2"
                                    style={{ left: marker.position }}
                                >
                                    <div className="h-3 border-l border-gray-300 dark:border-gray-600"></div>
                                    <span className={`text-xs font-medium whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {marker.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Tasks */}
                        <div className="space-y-6 mt-8 pb-2">
                            {formattedTasks.length > 0 ? (
                                formattedTasks.map((task, index) => {
                                    const position = getTaskPosition(task.startDate as unknown as string, task.endDate as unknown as string);
                                    const isSelected = selectedTask === task.id;

                                    return (
                                        <div
                                            key={task.id}
                                            className={`relative h-16 transition-all duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            {/* Task Label */}
                                            <div className="absolute top-0 left-0 w-48 pr-4 flex items-center h-full">
                                                <div className="flex items-center">
                                                    <img
                                                        src={`/${task.avatar}`}
                                                        alt={task.owner}
                                                        className={`w-6 h-6 rounded-full mr-3 border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
                                                    />
                                                    <span className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                        {task.title}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Timeline bar */}
                                            <div className="absolute left-52 right-0 h-full flex items-center">
                                                <div className={`absolute h-1 w-full rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

                                                {/* Task bar */}
                                                <div
                                                    className={`absolute h-10 rounded-md shadow-sm cursor-pointer transition-all duration-300 ${getStatusColor(task.status)} ${isSelected
                                                        ? `ring-2 ring-offset-2 ${isDarkMode ? 'ring-indigo-400 ring-offset-gray-800' : 'ring-indigo-300'}`
                                                        : 'hover:shadow-md hover:-translate-y-1'
                                                        }`}
                                                    style={{ ...position }}
                                                    onClick={() => setSelectedTask(isSelected ? null : task.id)}
                                                >
                                                    <div className="p-2 text-xs text-white font-medium truncate flex items-center h-full">
                                                        <span>{task.title}</span>
                                                        {!isMobile && task.progress > 0 && (
                                                            <span className="ml-2 bg-white bg-opacity-30 px-1 rounded-sm text-xs">
                                                                {task.progress.toFixed(0)}%
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Progress bar */}
                                                    <div
                                                        className="absolute bottom-0 left-0 h-1.5 bg-white bg-opacity-30 rounded-b-md transition-all duration-1000"
                                                        style={{ width: `${isAnimated ? task.progress : 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Task Details Panel (conditionally rendered) */}
                                            {isSelected && (
                                                <div className={`absolute top-full left-52 mt-3 z-10 rounded-lg shadow-lg border p-4 w-64 animate-fadeIn ${isDarkMode
                                                    ? 'bg-gray-800 border-gray-700 text-white'
                                                    : 'bg-white border-gray-200'
                                                    }`}>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                            {task.title}
                                                        </h4>
                                                        <button
                                                            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                                                            onClick={() => setSelectedTask(null)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                    <div className="space-y-2 text-sm">
                                                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                                                            {task.description}
                                                        </p>
                                                        <div className="flex items-center">
                                                            <span className={`w-24 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status:</span>
                                                            <StatusLabel status={task.status} />
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className={`w-24 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Owner:</span>
                                                            <div className="flex items-center">
                                                                <img src={task.avatar} alt={task.owner} className="w-5 h-5 rounded-full mr-1" />
                                                                <span>{task.owner}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className={`w-24 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Timeline:</span>
                                                            <span>{formatDate(task.startDate as unknown as string)} - {formatDate(task.endDate as unknown as string)}</span>
                                                        </div>
                                                        <div className="pt-2">
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="font-medium">Progress</span>
                                                                <span>{task.progress.toFixed(0)}%</span>
                                                            </div>
                                                            <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                                <div
                                                                    className={`h-2 rounded-full ${getStatusColor(task.status)}`}
                                                                    style={{ width: `${task.progress}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <p className="text-lg">No tasks available for this project</p>
                                    <p className="mt-2">Click the button below to add a new task</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile indicator */}
                {isMobile && (
                    <div className={`text-center text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span>← Scroll horizontally to view timeline →</span>
                    </div>
                )}

                {/* Legend and Add Button */}
                <div className={`mt-6 flex flex-wrap justify-between items-center gap-4 border-t pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500'}`}></div>
                            <span>Completed</span>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'}`}></div>
                            <span>In Progress</span>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${isDarkMode ? 'bg-gray-600' : 'bg-slate-400'}`}></div>
                            <span>Not Started</span>
                        </div>
                    </div>

                    <button
                        className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600 transition-colors duration-200"
                        onClick={() => setIsModelNewTaskOpen(true)}
                    >
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Task
                    </button>
                </div>
            </div>

            {/* Add custom animation keyframes */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default ProjectTimeline;
