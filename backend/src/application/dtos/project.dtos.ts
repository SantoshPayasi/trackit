type Project = {
    name: string,
    description: string | null,
    startDate: Date | null,
    endDate: Date | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    id: number | null
}

type ProjectCreateRequestDto = {
    name: string,
    description: string | null,
    startDate: Date | null,
    endDate: Date | null
}


export { Project, ProjectCreateRequestDto }