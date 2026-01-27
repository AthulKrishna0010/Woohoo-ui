"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaLock, FaFilter } from "react-icons/fa";

// Types
type User = {
    _id: string;
    name: string;
    phoneNumber: string;
    uniqueKey: string;
    score: number;
    reward: string;
    isClaimed: boolean;
    claimedAt?: string;
    activeUntil?: string;
};

// API Base URL
// const API_BASE = "http://localhost:3000"; // Local
const API_BASE = "https://woohoo-17qy.onrender.com"; // Production

export default function SecretPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [secretCode, setSecretCode] = useState("");

    // Persist session lightly (optional)
    useEffect(() => {
        const cached = sessionStorage.getItem("admin_secret");
        if (cached) {
            validateCode(cached).then(valid => {
                if (valid) {
                    setSecretCode(cached);
                    setIsAuthenticated(true);
                }
            });
        }
    }, []);

    const validateCode = async (code: string) => {
        try {
            const res = await fetch(`${API_BASE}/admin/validate`, {
                method: "POST",
                headers: { "x-admin-secret": code }
            });
            return res.ok;
        } catch (e) {
            return false;
        }
    };

    if (isAuthenticated) {
        return <DashboardView secretCode={secretCode} />;
    }

    return (
        <LoginView
            secretCode={secretCode}
            setSecretCode={setSecretCode}
            onLogin={async () => {
                const isValid = await validateCode(secretCode);
                if (isValid) {
                    sessionStorage.setItem("admin_secret", secretCode);
                    setIsAuthenticated(true);
                } else {
                    alert("Access Denied");
                }
            }}
        />
    );
}

function LoginView({ secretCode, setSecretCode, onLogin }: { secretCode: string, setSecretCode: (s: string) => void, onLogin: () => void }) {
    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img src="/Cardio zone.png" alt="Background" className="w-full h-full object-cover opacity-40 grayscale" />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                {/* Logo - The Trigger */}
                <div
                    className="w-32 h-32 cursor-pointer active:scale-95 transition-transform"
                    onDoubleClick={onLogin}
                    title="Double click to enter"
                >
                    <img src="/logo.svg" alt="Woohoo Admin" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                </div>

                <div className="w-full max-w-xs flex flex-col gap-4">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#ccff00] focus-within:bg-black/80 transition-all">
                        <FaLock className="text-white/30" />
                        <input
                            type="password"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            placeholder="Enter Secret Code"
                            className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20 font-mono text-center tracking-widest"
                        />
                    </div>

                    {/* Fake Submit Button */}
                    <button
                        className="w-full py-3 bg-white/10 text-white/40 font-bebas uppercase tracking-widest cursor-not-allowed hover:bg-white/15 transition-colors rounded-lg"
                        onClick={(e) => e.preventDefault()}
                    >
                        Submit
                    </button>

                    <p className="text-xs text-center text-white/30 mt-2 uppercase tracking-widest">
                        Restricted Access
                    </p>
                </div>
            </div>
        </div>
    );
}

function DashboardView({ secretCode }: { secretCode: string }) {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<'all' | 'claimed' | 'not_claimed' | 'active' | 'expired'>('all');
    const [claimingUser, setClaimingUser] = useState<User | null>(null);
    const [isClaiming, setIsClaiming] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Fetch ALL users and filter locally for 'active'/'expired' since backend might not support it yet
            // Or pass query params if backend supports. For robust 'active/expired', local filtering is easier for now.
            const queryParams = new URLSearchParams();
            // Passing search to backend is fine
            if (search) queryParams.set("search", search);

            // We'll manage complex filters client side for 'active'/'expired', 
            // but 'claimed'/'not_claimed' can go to backend if optimization needed.
            // Let's get all matches for search and filter client side to be safe with mixed logic.

            const res = await fetch(`${API_BASE}/admin/rewards?search=${search}`, {
                headers: { "x-admin-secret": secretCode }
            });

            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(fetchUsers, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Apply Filters Client Side
    useEffect(() => {
        let res = users;

        if (filter === 'claimed') {
            res = res.filter(u => u.isClaimed);
        } else if (filter === 'not_claimed') {
            res = res.filter(u => !u.isClaimed);
        } else if (filter === 'active') {
            res = res.filter(u => {
                if (!u.isClaimed || !u.activeUntil) return false;
                return new Date(u.activeUntil) > new Date();
            });
        } else if (filter === 'expired') {
            res = res.filter(u => {
                if (!u.isClaimed || !u.activeUntil) return false;
                return new Date(u.activeUntil) < new Date();
            });
        }

        setFilteredUsers(res);
    }, [users, filter]);


    const handleClaim = (id: string) => {
        const user = users.find(u => u._id === id);
        if (user) setClaimingUser(user);
    };

    const confirmClaim = async () => {
        if (!claimingUser) return;
        setIsClaiming(true);
        try {
            const res = await fetch(`${API_BASE}/admin/claim/${claimingUser._id}`, {
                method: "PATCH",
                headers: { "x-admin-secret": secretCode }
            });
            if (res.ok) {
                fetchUsers();
                setClaimingUser(null);
            } else {
                alert("Failed to claim reward");
            }
        } catch (error) {
            alert("Error connecting to server");
        } finally {
            setIsClaiming(false);
        }
    };

    // Stats
    const total = users.length;
    const claimedCount = users.filter(u => u.isClaimed).length;
    const notClaimedCount = total - claimedCount;
    const activeCount = users.filter(u => {
        if (!u.isClaimed || !u.activeUntil) return false;
        return new Date(u.activeUntil) > new Date();
    }).length;
    const expiredCount = users.filter(u => {
        if (!u.isClaimed || !u.activeUntil) return false;
        return new Date(u.activeUntil) < new Date();
    }).length;

    return (
        <div className="min-h-screen bg-black text-white font-inter selection:bg-[#ccff00] selection:text-black pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg shadow-[#ccff00]/5">
                <div className="flex items-center gap-4">
                    <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
                    <div className="h-8 w-[1px] bg-white/20" />
                    <h1 className="text-xl font-bebas tracking-wide text-[#ccff00]">ADMIN CONSOLE</h1>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 md:gap-6 text-sm overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <StatBox label="Total" value={total} color="text-white" />
                    <div className="h-8 w-[1px] bg-white/10 shrink-0" />
                    <StatBox label="Claimed" value={claimedCount} color="text-[#ccff00]" />
                    <StatBox label="Unclaimed" value={notClaimedCount} color="text-white/50" />
                    <div className="h-8 w-[1px] bg-white/10 shrink-0" />
                    <StatBox label="Active" value={activeCount} color="text-green-400" />
                    <StatBox label="Expired" value={expiredCount} color="text-red-400" />
                </div>
            </div>

            <div className="container mx-auto max-w-7xl p-6">
                {/* Controls */}
                <div className="flex flex-col xl:flex-row gap-4 mb-8 justify-between">
                    <div className="flex-1 relative max-w-xl">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by Name, Phone, or Key..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-[#ccff00] transition-colors outline-none"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex md:flex-wrap gap-2 bg-white/5 p-1 rounded-lg border border-white/10 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {(['all', 'claimed', 'not_claimed', 'active', 'expired'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-md text-xs md:text-sm uppercase font-bold tracking-wider transition-all whitespace-nowrap ${filter === f ? 'bg-[#ccff00] text-black shadow-md' : 'text-white/50 hover:bg-white/10'}`}
                            >
                                {f.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ccff00]" />
                    </div>
                ) : (
                    <>
                        {/* Desktop View: Table */}
                        <div className="hidden md:block overflow-hidden rounded-xl border border-white/10 bg-white/5">
                            <UserTable users={filteredUsers} onClaim={handleClaim} />
                        </div>

                        {/* Mobile View: Cards */}
                        <div className="md:hidden grid grid-cols-1 gap-4">
                            <AnimatePresence>
                                {filteredUsers.map(user => (
                                    <UserCard key={user._id} user={user} onClaim={() => handleClaim(user._id)} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="col-span-full text-center py-20 text-white/30">
                                No records found.
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {claimingUser && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#111] border border-white/10 p-6 rounded-xl max-w-sm w-full shadow-2xl"
                        >
                            <h3 className="text-xl font-bebas text-white mb-2 tracking-wide">Confirm Activation</h3>
                            <p className="text-white/60 mb-6 text-sm">
                                Activating <span className="text-[#ccff00] font-bold">{claimingUser.reward.split('_')[0]} days pass</span> for <span className="text-white font-bold">{claimingUser.name}</span>?
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setClaimingUser(null)}
                                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bebas rounded-lg transition-colors border border-white/10 uppercase"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmClaim}
                                    disabled={isClaiming}
                                    className="flex-1 py-3 bg-[#ccff00] hover:bg-white text-black font-bebas rounded-lg transition-colors uppercase disabled:opacity-50"
                                >
                                    {isClaiming ? "Activating..." : "Confirm"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatBox({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="flex flex-col items-center leading-none">
            <span className={`text-2xl font-bebas ${color}`}>{value}</span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
        </div>
    );
}

// Helper: Date Formatter dd/mm/yyyy
const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // en-GB uses dd/mm/yyyy
};

// --- Desktop Table Component ---
function UserTable({ users, onClaim }: { users: User[], onClaim: (id: string) => void }) {
    if (users.length === 0) return null;

    return (
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-black/40 text-xs uppercase tracking-widest text-white/40 border-b border-white/10">
                    <th className="p-4 font-normal">Details</th>
                    <th className="p-4 font-normal">Contact</th>
                    <th className="p-4 font-normal">Ticket ID</th>
                    <th className="p-4 font-normal text-center">Reward</th>
                    <th className="p-4 font-normal text-center">Status</th>
                    <th className="p-4 font-normal text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {users.map(user => {
                    const isExpired = user.activeUntil ? new Date(user.activeUntil) < new Date() : false;
                    return (
                        <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                            <td className="p-4">
                                <span className="font-bold text-white block">{user.name}</span>
                            </td>
                            <td className="p-4 font-mono text-white/70 text-sm">{user.phoneNumber}</td>
                            <td className="p-4 font-mono text-[#ccff00] text-sm">{user.uniqueKey}</td>
                            <td className="p-4 text-center">
                                <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs font-bold uppercase">
                                    {user.reward.replace('_', ' ')}
                                </span>
                            </td>
                            <td className="p-4 text-center">
                                {user.isClaimed ? (
                                    <div className="flex flex-col items-center">
                                        <span className={`text-xs font-bold uppercase ${isExpired ? 'text-red-500' : 'text-green-400'}`}>
                                            {isExpired ? 'Expired' : 'Active'}
                                        </span>
                                        {user.activeUntil && (
                                            <span className="text-[10px] text-white/40">
                                                Until: {formatDate(user.activeUntil)}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-white/30 text-xs uppercase">Not Claimed</span>
                                )}
                            </td>
                            <td className="p-4 text-right">
                                {!user.isClaimed && (
                                    <button
                                        onClick={() => onClaim(user._id)}
                                        className="px-4 py-2 bg-[#ccff00] text-black font-bebas text-sm uppercase rounded hover:bg-white transition-colors"
                                    >
                                        Claim
                                    </button>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

// --- Mobile Card Component ---
function UserCard({ user, onClaim }: { user: User, onClaim: () => void }) {
    const isExpired = user.activeUntil ? new Date(user.activeUntil) < new Date() : false;
    const isActive = user.isClaimed && !isExpired;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative p-5 rounded-xl border ${isActive ? 'border-[#ccff00]/50 bg-[#ccff00]/5' : 'border-white/10 bg-white/5'} overflow-hidden`}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white truncate">{user.name}</h3>
                    <p className="text-sm text-white/50 font-mono">{user.phoneNumber}</p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bebas text-[#ccff00]">{user.reward.replace('_', ' ')}</span>
                    <span className="text-[10px] uppercase text-white/30">Reward</span>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/10 px-2 py-1 rounded text-xs font-mono text-white/70">
                    {user.uniqueKey}
                </span>
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-xs font-bold uppercase tracking-wider">
                    {user.isClaimed ? (isExpired ? <span className="text-red-500">Expired</span> : <span className="text-[#ccff00]">Active</span>) : <span className="text-white/40">Pending</span>}
                </span>
            </div>

            {user.isClaimed ? (
                <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-xs text-white/60 flex flex-col gap-1">
                    <div className="flex justify-between">
                        <span>Claimed:</span>
                        <span className="text-white">{formatDate(user.claimedAt)}</span>
                    </div>
                    {user.activeUntil && (
                        <div className="flex justify-between">
                            <span>Valid Until:</span>
                            <span className={isExpired ? "text-red-400" : "text-[#ccff00]"}>
                                {formatDate(user.activeUntil)}
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={onClaim}
                    className="w-full py-3 bg-white text-black font-bebas text-lg uppercase hover:bg-[#ccff00] transition-colors rounded-lg flex items-center justify-center gap-2"
                >
                    <FaCheckCircle /> Approve Claim
                </button>
            )}
        </motion.div>
    );
}
