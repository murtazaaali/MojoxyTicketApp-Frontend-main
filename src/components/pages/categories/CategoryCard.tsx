
import { useNavigate } from 'react-router-dom';
import type { EventCategory } from '../../../types';
import { Card } from '../../ui'
import { ROUTES_PATHS } from '../../../routes/routes_path';

const CategoryCard = ({ category }: { key: number, category: EventCategory }) => {
    const navigate = useNavigate()

    const handleCategoryClick = (category: string) => {
        navigate(`/${ROUTES_PATHS.PUBLIC.EVENTS_LIST}?category=${encodeURIComponent(category.toLocaleLowerCase())}`);
    }

    const Icon = category.icon;

    return (
        <div
            onClick={() => handleCategoryClick(category.label)}
            className="group"
        >
            <Card className={`
                                    relative p-6 text-center cursor-pointer 
                                    bg-linear-to-br'from-purple-500/20 to-pink-500/20
                                     border-purple-500/30 hover:border-purple-500/60'
                                    backdrop-blur-sm
                                    transition-all duration-300
                                    hover:scale-105 hover:shadow-2xl
                                    border-2
                                    overflow-hidden
                                `}>
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-linear-to-br
             from-white/0 to-white/5 opacity-0 group-hover:opacity-100
              transition-opacity duration-300"></div>

                {/* Icon Container */}
                <div className="relative flex justify-center mb-4">
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-current blur-xl opacity-0
                     group-hover:opacity-30 transition-opacity
                      duration-300"></div>

                        <Icon
                            size={48}
                            className={`'text-purple-400 group-hover:text-purple-300' relative z-10 
                            transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="relative z-10">
                    <h3 className="font-bold text-white mb-2 text-sm md:text-base
                 group-hover:text-white transition-colors">
                        {category.label}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 
                transition-colors">
                        {category.value} events
                    </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br
             from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100
              transition-opacity duration-300"></div>
            </Card>
        </div>
    )
}

export default CategoryCard
