interface TopHeaderProps {
    title: string
    description?: string
}

const TopHeader = ({ title, description }: TopHeaderProps) => {
    return (
        <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-white">
                {title || "Title"}
            </h4>
            <p className="mb-6 text-sm text-gray-200  lg:mb-7">
                {description || "Description"}
            </p>
        </div>
    )
}

export default TopHeader
