import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../../../routes/routes_path';
import type { Ticket, TicketDetail } from '../../../types'
import StatusBadge from './StatusBadge';
import { Calendar, ChevronRight, CreditCard, MapPin, TicketIcon, QrCode } from 'lucide-react';
import { calculateGrandTotal, formatDate } from '../../../utilities/functions';
import PaymentStatusBadge from './PaymentStatusBadge';
import SelfTicketCardModel from './SelfTicketCardModel';
import { DownloadTicket } from '../../shared';
import { Button } from '../../ui';



const SelfTicketCard = ({ ticket }: { ticket: Ticket }) => {
    const navigate = useNavigate();
    const event = ticket.event;
    const [showDetails, setShowDetails] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<TicketDetail | null>(null);

    if (!event) return null;

    const handleViewQR = (ticketData: TicketDetail) => {
        setSelectedTicket(ticketData);
        setShowQRModal(true);
    };

    return (
        <>
            <div className="bg-white/3 rounded-2xl
            border border-white/10 overflow-hidden hover:border-white/20
             transition-all duration-300 group">
                <div className="relative h-40">
                    <img
                        src={
                            event?.image instanceof File
                                ? URL.createObjectURL(event.image)
                                : event?.image
                        }
                        alt={event?.event_name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/60 to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-2">
                        <StatusBadge status={ticket.status as string} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-purple-500/30 text-purple-300 text-xs font-semibold px-2 py-0.5 rounded border border-purple-500/50 capitalize">
                                {event.categ.toUpperCase()}
                            </span>
                            <span className="bg-white/20 text-gray-200 text-xs font-medium px-2 py-0.5 rounded border border-white/30 capitalize">
                                {event.event_type}
                            </span>
                        </div>
                        <h3 className="text-white font-bold text-base line-clamp-1">
                            {event.event_name}
                        </h3>
                    </div>
                </div>
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span>
                                {formatDate(event.start_date)}
                                {event.start_date !== event.end_date && (
                                    <span className="text-gray-600"> – {formatDate(event.end_date)}</span>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 text-rose-400" />
                        <span>  {event.address || "N/A"} ( {event.city || "N/A"} )</span>
                    </div>
                </div>
                <div className="bg-white/4 p-3 border border-white/8">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <TicketIcon className="w-4 h-4 text-emerald-400" />
                            <span className="text-white text-sm font-semibold">
                                {ticket.tickets.length} Ticket{ticket.tickets.length > 1 ? "s" : ""}
                            </span>
                        </div>
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                        >
                            {showDetails ? "Hide" : "View"} Details
                            <ChevronRight
                                className={`w-3 h-3 transition-transform ${showDetails ? "rotate-90" : ""
                                    }`}
                            />
                        </button>
                    </div>
                    {showDetails && (
                        <div className="space-y-2 mt-3 pt-3 border-t border-white/6">
                            {ticket.tickets.map((t, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-emerald-500/30 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium mb-0.5">{t.name}</p>
                                                <p className="text-gray-400 text-xs mb-2">{t.type}</p>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {t.qr_code && (
                                                        <button
                                                            onClick={() => handleViewQR(t)}
                                                            className="flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30 text-xs font-medium transition-colors"
                                                        >
                                                            <QrCode className="w-3.5 h-3.5" />
                                                            Holder Ticket
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-gray-400 text-xs mb-0.5">Price</p>
                                            <p className="text-white font-bold text-lg">
                                                {t.priceAmount}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-3 space-y-3 border-t border-white/6">
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <div>
                                <p className="text-gray-500 text-xs">Payment Method</p>
                                <p className="text-white text-sm font-medium capitalize">
                                    {ticket?.payment_method}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-xs">Total Paid</p>
                            <p className="text-emerald-400 text-base font-bold">
                                {
                                    calculateGrandTotal(
                                        ticket?.platform_fee_type || "flat",
                                        ticket?.platform_fee_value || 0,
                                        ticket?.total_amount || 0
                                    ).grandTotal
                                }
                            </p>

                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <PaymentStatusBadge status={ticket.payment_status as string} />
                        <div className="text-xs text-gray-500">
                            Booked on{" "}
                            {new Date(ticket?.createdAt || "").toLocaleDateString("en-PK", {
                                day: "numeric",
                                month: "short",
                            })}
                        </div>
                    </div>
                    {ticket?.payment_status === "pending" && <div className="flex justify-end">
                        <Button onClick={() => navigate(ROUTES_PATHS?.DASHBOARD?.TICKET?.SELF_TICKET_UPDATE(ticket?._id || ""))}
                            variant="ghost" size="sm">Update Ticket</Button>
                    </div>}
                    <div className="flex justify-end">
                        <DownloadTicket ticket={ticket} />
                    </div>
                </div>

            </div>

            {/* QR Code Modal */}
            {showQRModal && selectedTicket && (
                <SelfTicketCardModel
                    event_name={event.event_name}
                    selectedTicket={selectedTicket}
                    setShowQRModal={setShowQRModal}
                />
            )}
        </>
    )
}

export default SelfTicketCard