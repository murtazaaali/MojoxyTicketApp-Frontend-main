import { useNavigate } from 'react-router-dom'
import type { Event } from '../../../types'
import { Badge, Card } from '../../ui'
import {
  Calendar,
  // Heart,
  MapPin,
  Tickets,
  // Star 
} from 'lucide-react'
import { ROUTES_PATHS } from '../../../routes/routes_path'


interface EventCardProps {
  event: Event
}

const EventCard = ({ event }: EventCardProps) => {

  const navigate = useNavigate();

  const startingPrice = event.prices?.length
    ? Math.min(...event.prices.map(p => p.amount))
    : null;

  const totalAttending = event.prices?.reduce(
    (sum, price) => sum + price.capacity,
    0
  ) ?? 0;


  const handleClick = () => {
    navigate(ROUTES_PATHS?.PUBLIC?.EVENT_DETAIL(event._id as string));
  };


  return (

    <div onClick={() => handleClick()}>
      <Card className="overflow-hidden group cursor-pointer" >
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              event?.image instanceof File
                ? URL.createObjectURL(event.image)
                : event?.image
            }
            alt={event.event_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="primary">{event.categ.toUpperCase()}</Badge>

          </div>
          {/* <button className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
            <Heart className="w-5 h-5 text-white" />
          </button> */}
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="flex gap-2">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-500 transition-colors">
                  {event.event_name}
                </h3>
              </div>
              <div>
                <Badge variant="default">{event.event_type}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">

                <Calendar className="w-4 h-4" />
                {event.start_date} - {event.end_date}

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                {event.address || "N/A"} ( {event.city || "N/A"} )
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">
                  Starting from
                </span>

                <span className="text-2xl font-bold text-white">
                  {startingPrice
                    ? `Rs. ${startingPrice.toLocaleString()}`
                    : "Free"}
                </span>

                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Tickets className="w-4 h-4 text-purple-500" />
                  only {totalAttending.toLocaleString()} tickets left
                </div>

              </div>


            </div>
            {/* <div className="flex items-center gap-1 bg-amber-500/20 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-amber-500">{event.rating}</span>
            </div> */}
          </div>
        </div>
      </Card>
    </div>


  )
}

export default EventCard