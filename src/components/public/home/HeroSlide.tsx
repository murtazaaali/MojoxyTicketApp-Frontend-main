import type { Event } from "../../../types"
import { MapPin, Ticket } from "lucide-react"
import { Badge, Button } from "../../ui"

interface SlideProps {
    slide: Event,
    idx: number,
    currentSlide: number,
    handleGetTickets: () => void
}

const HeroSlide = ({ slide, idx, currentSlide, handleGetTickets }: SlideProps) => {

    const startingPrice = slide.prices?.length
        ? Math.min(...slide.prices.map(p => p.amount))
        : null;

    return (
        <div
            key={slide._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* slide */}
            <div className="flex flex-col h-full lg:block">

                {/* IMAGE */}
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full flex-shrink-0">
                    <img
                        src={
                            slide?.image instanceof File
                                ? URL.createObjectURL(slide.image)
                                : slide?.image
                        }
                        alt={slide.event_name}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/20 lg:to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="relative flex-1 bg-black lg:absolute lg:inset-0 lg:bg-transparent">
                    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start lg:items-end pt-4 pb-4 lg:pb-12">
                        <div className="w-full max-w-xl space-y-2 sm:space-y-3">

                            <Badge variant="primary" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
                                {slide.categ.toUpperCase()}
                            </Badge>

                            {/* Title — bigger on mobile */}
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                                {slide.event_name}
                            </h2>

                            {/* Price + City — stacked on mobile, row on sm+ */}
                            <div className="flex flex-col sm:flex-row sm:items-center  gap-2 sm:gap-6">
                                <div className="flex items-center gap-2">
                                    <Ticket className="w-4 h-4 text-purple-400 shrink-0" />
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-xs text-gray-400">Starting from</span>
                                        <span className="text-lg sm:text-xl font-bold text-white">
                                            {startingPrice ? `Rs. ${startingPrice.toLocaleString()}` : "N/A"}
                                        </span>
                                    </div>
                                </div>
                                {slide?.city && <div className="flex items-center gap-2 text-gray-300">
                                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                                    <span className="text-sm sm:text-base">
                                        {slide?.city}
                                    </span>
                                </div>}
                            </div>

                            {/* Buttons — always left-aligned, never stretch */}
                            <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                                <Button
                                    size="sm"
                                    icon={<Ticket className="w-4 h-4" />}
                                    onClick={() => handleGetTickets()}
                                >
                                    Get Tickets
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleGetTickets()}
                                >
                                    Learn More
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeroSlide 
