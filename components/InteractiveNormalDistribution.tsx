
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from 'recharts';

// Standard Normal Distribution PDF
const normalPDF = (x: number, mu: number, sigma: number): number => {
    const sigmaSq = Math.pow(sigma, 2);
    return (1 / Math.sqrt(2 * Math.PI * sigmaSq)) * Math.exp(-Math.pow(x - mu, 2) / (2 * sigmaSq));
};

const InteractiveNormalDistribution: React.FC = () => {
    const [mean, setMean] = useState(0);
    const [stdDev, setStdDev] = useState(1);

    const data = useMemo(() => {
        const points = [];
        const minX = mean - 4 * stdDev;
        const maxX = mean + 4 * stdDev;
        const step = (maxX - minX) / 100;

        for (let x = minX; x <= maxX; x += step) {
            points.push({ x: x.toFixed(2), y: normalPDF(x, mean, stdDev) });
        }
        return points;
    }, [mean, stdDev]);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-center">Interactive Normal Distribution</h3>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} label={{ value: 'Value', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Probability Density', angle: -90, position: 'insideLeft' }} />
                        <Tooltip
                            formatter={(value: number) => value.toFixed(4)}
                            labelFormatter={(label) => `x: ${label}`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="y" name="PDF" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <ReferenceLine x={mean} stroke="red" strokeDasharray="3 3" label={{ value: `μ=${mean}`, fill: 'red' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-4">
                <div>
                    <label htmlFor="mean" className="block text-sm font-medium mb-1">Mean (μ): {mean}</label>
                    <input
                        id="mean"
                        type="range"
                        min="-10"
                        max="10"
                        step="0.5"
                        value={mean}
                        onChange={(e) => setMean(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                </div>
                <div>
                    <label htmlFor="stdDev" className="block text-sm font-medium mb-1">Standard Deviation (σ): {stdDev}</label>
                    <input
                        id="stdDev"
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.1"
                        value={stdDev}
                        onChange={(e) => setStdDev(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                </div>
            </div>
        </div>
    );
};

export default InteractiveNormalDistribution;
