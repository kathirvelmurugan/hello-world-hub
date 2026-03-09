import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    Clock,
    Database,
    History,
    Server,
    Zap
} from 'lucide-react';
import {
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { format, formatDistanceToNow } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const STATUS_COLORS: Record<string, string> = {
    ACTIVE: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    DEGRADED: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    RATE_LIMIT: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    INVALID_KEY: 'text-red-400 bg-red-400/10 border-red-400/20',
    PAYMENT_ISSUE: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    DOWN: 'text-red-400 bg-red-400/10 border-red-400/20',
};

const STATUS_ICONS: Record<string, JSX.Element> = {
    ACTIVE: <CheckCircle2 className="w-5 h-5" />,
    DEGRADED: <AlertCircle className="w-5 h-5" />,
    RATE_LIMIT: <Clock className="w-5 h-5" />,
    INVALID_KEY: <AlertCircle className="w-5 h-5" />,
    PAYMENT_ISSUE: <Database className="w-5 h-5" />,
    DOWN: <Server className="w-5 h-5" />,
};

interface Log {
    id: string;
    timestamp: string;
    status: string;
    response_time_ms: number;
    error_message?: string;
}

export default function AlchemyDashboard() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        successRate: 0,
        avgResponse: 0,
        failures: 0
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchInitialLogs();

        // Subscribe to real-time updates
        const channel = supabase
            .channel('alchemy_monitor_logs_changes')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'alchemy_monitor_logs' },
                (payload) => {
                    setLogs(prev => [payload.new as Log, ...prev].slice(0, 100));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        if (logs.length > 0) {
            calculateStats();
        }
    }, [logs]);

    async function fetchInitialLogs() {
        try {
            const { data, error: fetchError } = await supabase
                .from('alchemy_monitor_logs')
                .select('*')
                .order('timestamp', { ascending: false })
                .limit(100);

            if (fetchError) {
                if (fetchError.code === '42P01') {
                    throw new Error('Table "alchemy_monitor_logs" not found. Please run the SQL setup script.');
                }
                throw fetchError;
            }
            setLogs((data as Log[]) || []);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching logs:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function calculateStats() {
        const total = logs.length;
        if (total === 0) return;

        const successful = logs.filter(l => l.status === 'ACTIVE').length;
        const failures = logs.filter(l => l.status !== 'ACTIVE' && l.status !== 'DEGRADED').length;
        const avgResponse = logs.reduce((acc, curr) => acc + (curr.response_time_ms || 0), 0) / total;

        setStats({
            total,
            successRate: (successful / total) * 100,
            avgResponse: Math.round(avgResponse),
            failures
        });
    }

    const latestLog = logs[0];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0c0e12] text-white">
                <div className="animate-pulse flex flex-col items-center">
                    <Activity className="w-12 h-12 text-blue-500 mb-4" />
                    <p className="text-gray-400">Loading Monitor Dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0c0e12] text-white p-6 text-center">
                <div className="max-w-md bg-red-950/20 border border-red-500/50 p-8 rounded-2xl shadow-2xl">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Connect to Supabase</h2>
                    <p className="text-red-200/70 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-600 hover:bg-red-500 transition-colors rounded-lg font-bold"
                    >
                        Retry Connection
                    </button>
                    <p className="mt-4 text-sm text-slate-500">
                        Check your <code>.env</code> file.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c0e12] text-slate-200 p-4 md:p-8 font-sans">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        Alchemy API Monitor
                    </h1>
                    <p className="text-slate-400 mt-1 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live Health Monitoring System
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>Last Sync: {latestLog ? format(new Date(latestLog.timestamp), 'HH:mm:ss') : 'Never'}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Status Highlights */}
                <div className="md:col-span-4 space-y-6">
                    {/* Main Status Card */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Zap className="w-20 h-20 text-blue-500" />
                        </div>

                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Current API Status</h2>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={cn(
                                "p-4 rounded-2xl border-2 flex items-center justify-center transition-all duration-300",
                                latestLog ? STATUS_COLORS[latestLog.status] : 'text-slate-400 bg-slate-800 border-slate-700'
                            )}>
                                {latestLog ? STATUS_ICONS[latestLog.status] : <Server className="w-8 h-8" />}
                            </div>
                            <div>
                                <div className="text-4xl font-black tracking-tighter">
                                    {latestLog ? latestLog.status : 'OFFLINE'}
                                </div>
                                <div className="text-sm text-slate-500 mt-1">
                                    Updated {latestLog ? formatDistanceToNow(new Date(latestLog.timestamp), { addSuffix: true }) : 'N/A'}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="text-xs text-slate-500 mb-1">Latency</div>
                                <div className="text-xl font-bold text-slate-200">
                                    {latestLog?.response_time_ms ? `${latestLog.response_time_ms}ms` : '---'}
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="text-xs text-slate-500 mb-1">Checks/60s</div>
                                <div className="text-xl font-bold text-slate-200">1</div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Uptime</div>
                            <div className="mt-2 text-2xl font-bold text-emerald-400">{stats.successRate.toFixed(1)}%</div>
                        </div>
                        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Incidents</div>
                            <div className="mt-2 text-2xl font-bold text-red-400">{stats.failures}</div>
                        </div>
                        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Avg Response</div>
                            <div className="mt-2 text-2xl font-bold text-blue-400">{stats.avgResponse}ms</div>
                        </div>
                        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Calls</div>
                            <div className="mt-2 text-2xl font-bold text-slate-200">{stats.total}</div>
                        </div>
                    </div>
                </div>

                {/* Charts and History */}
                <div className="md:col-span-8 space-y-6">
                    {/* Performance Chart */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl h-[300px]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-300">
                                <Activity className="w-5 h-5 text-blue-500" />
                                Response Time History (ms)
                            </h2>
                        </div>
                        <div className="w-full h-[220px] flex items-center justify-center">
                            {logs.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[...logs].reverse()}>
                                        <defs>
                                            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                            itemStyle={{ color: '#f1f5f9' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="response_time_ms"
                                            stroke="#3b82f6"
                                            fillOpacity={1}
                                            fill="url(#colorLatency)"
                                            isAnimationActive={false}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-slate-600 italic">No historical data available</div>
                            )}
                        </div>
                    </div>

                    {/* Log Table */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-300 flex items-center gap-2">
                                <History className="w-5 h-5 text-indigo-400" />
                                Incident Log
                            </h2>
                        </div>
                        <div className="overflow-x-auto max-h-[400px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-800/30 sticky top-0 backdrop-blur-md">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Timestamp</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Latency</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Error Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-slate-800/10 transition-colors group">
                                            <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">
                                                {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                                                    STATUS_COLORS[log.status]
                                                )}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-300 text-right font-mono">
                                                {log.response_time_ms}ms
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                                                {log.error_message || '---'}
                                            </td>
                                        </tr>
                                    ))}
                                    {logs.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-slate-600 italic">
                                                No logs collected yet. Waiting for first check...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
