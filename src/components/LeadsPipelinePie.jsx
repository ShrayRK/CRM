import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#00C49F', '#FF8042'];

const LeadsPipelinePie = ({ leads }) => {
    const closed = leads.filter(l => l.status === "Closed").length;
    const pipeline = leads.length - closed;

    const data = [
        {name: "Closed", value:closed },
        {name: "In Pipeline", value: pipeline },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
            <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
            >
                {data.map((_, index)=> (
                    <Cell key={index} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
        </ResponsiveContainer>
        
    )
}

export default LeadsPipelinePie;