import { CreateProjectRequestDto } from '@/app/types/project.types'
import { useCreateProjectMutation } from '@/state/project.api'
import Modal from '@/components/Modal'
import React from 'react'
import { motion } from "framer-motion"
import { formatISO } from "date-fns"
type Props = {
    isOpen: boolean,
    onClose: () => void
}
const ModelForNewProject = ({ isOpen, onClose }: Props) => {

    const [createProject, { isLoading }] = useCreateProjectMutation();

    const [projectForm, setProjectForm] = React.useState<CreateProjectRequestDto>({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
    })


    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!projectForm.name || !projectForm.startDate || !projectForm.endDate || !projectForm.description) return

        const formattedStartDate = formatISO(new Date(projectForm.startDate));
        const formattedEndDate = formatISO(new Date(projectForm.endDate));
        await createProject({
            name: projectForm.name,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            description: projectForm.description
        })
    }

    function isValidForm() {
        return projectForm.description && projectForm.startDate && projectForm.endDate;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setProjectForm({
            ...projectForm,
            [e.target.name]: e.target.value
        })
    }

    const inputStyle = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";


    return (
        <Modal isOpen={isOpen} onClose={onClose} name="New Project" >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-200"
            >
                <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Project Name</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="name"
                            value={projectForm.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            name="description"
                            value={projectForm.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Start Date</label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="date"
                                name="startDate"
                                value={projectForm.startDate}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Due Date</label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="date"
                                name="endDate"
                                value={projectForm.endDate}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Create Project
                    </motion.button>
                </form>
            </motion.div>
        </Modal>
    )
}

export default ModelForNewProject
