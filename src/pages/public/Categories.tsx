import { Sparkles } from "lucide-react"
import { PageHeader } from "../../components/shared"
import { EVENT_CATEGORIES } from "../../utilities/const"
import { CategoryCard } from "../../components/pages/categories"


const Categories = () => {

    return (
        <div className="min-h-screen relative pt-20 overflow-hidden max-w-7xl mx-auto px-6 xl:px-12 text-white">
            <div className="max-w-7xl mx-auto flex justify-between flex-wrap items-center">
                {/* <div className="text-center mb-12"> */}
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300 font-medium">Browse Categories</span>
                    </div>
                    <PageHeader title="Browse by Category" description="Discover amazing events tailored to your interests" />

                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {EVENT_CATEGORIES?.map((category, idx) => {

                        return (
                            <CategoryCard category={category} key={idx} />
                        );
                    })}
                </div>

            </div>
        </div>
    )
}

export default Categories
