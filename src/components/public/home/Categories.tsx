import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { EventCategory } from '../../../types';
import { Card } from '../../ui';

interface CategoriesProps {
    categories: EventCategory[];
}

const Categories = ({ categories }: CategoriesProps) => {
    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        navigate(`/events-list`, {
            state: {
                category
            }
        })
    }

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
                    <Link
                        to="/categories"
                        className="text-purple-500 hover:text-purple-400 text-sm font-medium flex items-center gap-2"
                    >
                        View All <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.slice(0, 6).map((category, idx) => {
                        const Icon = category.icon;
                        return (
                            <div key={idx} onClick={() => handleCategoryClick(category.value)}>
                                <Card
                                    className="p-6 text-center cursor-pointer group"

                                >
                                    <div className="flex justify-center mb-3">
                                        <Icon size={40} className="text-purple-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{category.label}</h3>
                                    <p className="text-sm text-gray-400">{category.value} events</p>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;