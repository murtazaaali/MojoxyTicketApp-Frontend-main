import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar } from 'recharts';
import type { EventTicketSales } from '../../../types';

interface Props {
    eventTicketSalesData: EventTicketSales[];
}

const EventBarChart = ({ eventTicketSalesData }: Props) => {
    return (
        <div className="p-6">
            <h3 className="text-lg font-bold text-gray-300">Tickets Sold per Event</h3>
            <p className="text-sm text-gray-100">Event-wise ticket sales</p>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eventTicketSalesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="eventName" stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            border: '1px solid #e5e7eb'
                        }}
                    />
                    <Bar dataKey="ticketsSold" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Tickets Sold" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventBarChart;
