import { Button } from '../../ui'
import { useNavigate } from 'react-router-dom'

interface TopHeaderProps {
    title: string
    description: string
    buttonTitle?: string
    showButton?: boolean
    buttonLink?: string | ((id?: string) => string)
}

const TopHeader = ({ title, description, buttonTitle = "", showButton = true, buttonLink = "" }: TopHeaderProps) => {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-white">
                    {title}
                </h4>
                <p className="mb-6 text-sm text-gray-200  lg:mb-7">
                    {description}
                </p>
            </div>

            {showButton && <Button
                variant="secondary"
                onClick={() => {
                    if (typeof buttonLink === "function") {
                        navigate(buttonLink())
                    } else {
                        navigate(buttonLink || "")
                    }
                }}

                className="w-full sm:w-auto"
            >
                {buttonTitle}
            </Button>
            }

        </div>
    )
}

export default TopHeader
