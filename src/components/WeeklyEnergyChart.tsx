import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';

type Props = {
  data: { day: string; completed: number; fullDate: string }[];
};

export default function WeeklyEnergyChart({ data }: Props) {
  return (
    <div className="chart-cozy-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="cozyEnergyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--accent-pink)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(167, 139, 250, 0.1)"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              border: '1.5px solid var(--glass-border)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 20px rgba(167, 139, 250, 0.15)',
              padding: '8px 12px'
            }}
            itemStyle={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '12px' }}
            labelStyle={{ color: 'var(--accent-pink)', marginBottom: '2px', fontWeight: 700, fontSize: '10px' }}
            cursor={{ stroke: 'var(--accent-purple)', strokeWidth: 1, strokeDasharray: '4 4' }}
            formatter={(value: any) => [`${value} tasks completed ✨`, 'Tasks']}
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="var(--accent-purple)"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#cozyEnergyGrad)"
            animationDuration={2500}
            dot={{ fill: 'var(--accent-pink)', r: 3, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: 'var(--accent-pink)', strokeWidth: 2, stroke: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <style>{`
        .chart-cozy-wrapper {
          width: 100%;
          height: 100%;
          padding: 0 5px;
        }
      `}</style>
    </div>
  );
}
