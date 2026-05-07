
interface PageHeaderProps {
    title: string,
    description: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
    return (
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-3">{title}</h1>
            <p className="text-gray-400 text-lg">
                {description}
            </p>
        </div>
    )
}

export default PageHeader
