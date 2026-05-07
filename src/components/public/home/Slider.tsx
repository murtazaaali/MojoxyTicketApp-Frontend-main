import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Event } from '../../../types';
import HeroSlide from './HeroSlide';
import { ROUTES_PATHS } from '../../../routes/routes_path';

const SLIDE_INTERVAL = 5000;

interface SliderProps {
    heroSlides: Event[];
}

const Slider = ({ heroSlides }: SliderProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const total = heroSlides.length;

    const next = useCallback(() => setCurrentSlide((p) => (p + 1) % total), [total]);
    const prev = useCallback(() => setCurrentSlide((p) => (p - 1 + total) % total), [total]);

    useEffect(() => {
        const timer = setInterval(next, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [next]);

    const handleGetTickets = () =>
        navigate(ROUTES_PATHS.PUBLIC.EVENT_DETAIL(heroSlides[currentSlide]._id as string));

    return (
        <div className="relative h-150">
            {heroSlides.map((slide, idx) => (
                <HeroSlide
                    key={slide._id ?? idx}
                    slide={slide}
                    idx={idx}
                    currentSlide={currentSlide}
                    handleGetTickets={handleGetTickets}
                />
            ))}

            {/* Navigation Arrows */}
            {[{ onClick: prev, side: 'left-4', rotate: 'rotate-180' }, { onClick: next, side: 'right-4', rotate: '' }].map(
                ({ onClick, side, rotate }, i) => (
                    <button
                        key={i}
                        onClick={onClick}
                        className={`absolute ${side} top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full flex items-center justify-center transition-all z-20 group`}
                    >
                        <ChevronRight className={`w-6 h-6 text-white ${rotate} group-hover:scale-110 transition-transform`} />
                    </button>
                )
            )}

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {heroSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`rounded-full transition-all ${idx === currentSlide
                                ? 'w-12 h-3 bg-purple-500'
                                : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;