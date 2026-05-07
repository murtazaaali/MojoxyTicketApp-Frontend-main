import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import type { MonthlyRevenue } from '../../../types';


interface LineChartProps {
    revenueData: MonthlyRevenue[];
}

const RevenueLineChart = ({
    revenueData
}: LineChartProps) => {


    return (
        <div className="">
            <div className="py-8">
                <h3 className="text-xl font-bold text-gray-300">My Revenue & Tickets</h3>
                <p className="text-lg text-gray-100">Your performance over time</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="month"
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: '#8b5cf6', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Revenue (Rs)"
                    />
                    <Line
                        type="monotone"
                        dataKey="tickets"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Tickets Sold"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default RevenueLineChart
