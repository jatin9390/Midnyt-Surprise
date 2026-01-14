import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const [settings, setSettings] = useState({
        recipientName: '',
        recipientEmail: '',
        birthdayDate: '',
        birthdayTime: '00:00'
    });
    const [status, setStatus] = useState('');

    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        // Only load settings if authenticated (or try to load public info?)
        // Actually, we wait for login to load full config.
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/config', {
                headers: { 'x-admin-password': password }
            });
            if (res.ok) {
                const data = await res.json();
                setSettings(data);
                setIsAuthenticated(true);
                setAuthError('');
            } else {
                setAuthError('Incorrect Password');
            }
        } catch (err) {
            console.error("Login Error Details:", err);
            setAuthError('Connection Failed: ' + (err.message || 'Network'));
        }
    };

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('saving');
        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': password
                },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                const data = await res.json(); // Read response (contains _id)
                setStatus('success');

                // Simple confirmation popup
                alert('Surprise Sent! 🚀');

                setTimeout(() => setStatus(''), 3000);

                // Clear fields as requested
                setSettings({
                    senderName: '',
                    recipientName: '',
                    recipientEmail: '',
                    birthdayDate: '',
                    birthdayTime: '00:00',
                    messageContent: '',
                    images: []
                });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen font-sans relative flex items-center justify-center p-4 overflow-y-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 animate-gradient-xy"></div>
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 w-full max-w-sm"
                >
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center">
                        <div className="mb-6">
                            <div className="inline-block p-3 bg-white/10 rounded-full mb-4 shadow-inner">
                                <Sparkles className="text-pink-300 w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                            <p className="text-white/60 text-sm mt-2">Enter password to continue</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/20 border-2 border-white/10 focus:border-pink-500 rounded-xl px-4 py-3 text-center text-white placeholder-white/30 transition-all focus:outline-none"
                                placeholder="Password"
                            />
                            {authError && <p className="text-red-400 text-sm font-medium">{authError}</p>}
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-bold shadow-lg transform active:scale-[0.98] transition-all"
                            >
                                Unlock
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans relative flex items-center justify-center p-4 overflow-y-auto">
            {/* Dreamy Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 animate-gradient-xy"></div>
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10 text-center">

                    {/* Header */}
                    <div className="mb-8">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 5 }}
                            className="inline-block p-3 bg-white/10 rounded-full mb-4 shadow-inner border border-white/10"
                        >
                            <Sparkles className="text-pink-300 w-8 h-8" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">Make it Magic</h1>
                        <p className="text-white/60 text-sm mt-2">Design the perfect surprise</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Centered Inputs */}
                        <div className="space-y-6">
                            {/* Sender Configuration */}
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-4">
                                <h3 className="text-pink-200 text-sm font-semibold uppercase tracking-wider mb-2">From You</h3>
                                <div className="group text-center">
                                    <label className="block text-xs uppercase tracking-widest text-pink-200/70 mb-2 font-medium">Your Name</label>
                                    <input
                                        type="text"
                                        name="senderName"
                                        value={settings.senderName || ''}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border-b-2 border-white/20 hover:border-pink-400 focus:border-pink-500 rounded-lg px-4 py-3 text-center text-lg text-white placeholder-white/30 transition-all focus:outline-none focus:bg-black/30"
                                        placeholder="e.g. Anil"
                                    />
                                    <p className="text-[10px] text-white/40 mt-1">This will be signed in the email.</p>
                                </div>

                                <div className="group text-center pt-2">
                                    <label className="block text-xs uppercase tracking-widest text-pink-200/70 mb-2 font-medium">Letter Message</label>
                                    <textarea
                                        name="messageContent"
                                        value={settings.messageContent || ''}
                                        onChange={handleChange}
                                        rows="10"
                                        className="w-full bg-black/20 border-2 border-white/20 hover:border-pink-400 focus:border-pink-500 rounded-lg px-4 py-3 text-white placeholder-white/30 transition-all focus:outline-none focus:bg-black/30 text-sm resize-none custom-scrollbar"
                                        placeholder="Write your beautiful message here..."
                                    />

                                </div>
                            </div>

                            {/* Photo Memories Configuration */}
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-4">
                                <h3 className="text-pink-200 text-sm font-semibold uppercase tracking-wider mb-2">Photo Memories</h3>

                                <div className="group text-center">
                                    <label className="block w-full cursor-pointer bg-black/20 hover:bg-black/30 border-2 border-dashed border-white/20 hover:border-pink-400 rounded-xl p-6 transition-all">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-3 bg-white/10 rounded-full">
                                                <Sparkles className="w-6 h-6 text-pink-300" />
                                            </div>
                                            <span className="text-sm text-white/80 font-medium">Click to Upload Photos</span>
                                            <span className="text-xs text-white/40">Max 5 photos (Rec: Square/Portrait)</span>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const files = Array.from(e.target.files);

                                                const processImage = (file) => {
                                                    return new Promise((resolve) => {
                                                        const reader = new FileReader();
                                                        reader.onload = (event) => {
                                                            const img = new Image();
                                                            img.onload = () => {
                                                                const canvas = document.createElement('canvas');
                                                                let width = img.width;
                                                                let height = img.height;

                                                                // Resize logic (Max 800px width)
                                                                const MAX_WIDTH = 800;
                                                                if (width > MAX_WIDTH) {
                                                                    height *= MAX_WIDTH / width;
                                                                    width = MAX_WIDTH;
                                                                }

                                                                canvas.width = width;
                                                                canvas.height = height;
                                                                const ctx = canvas.getContext('2d');
                                                                ctx.drawImage(img, 0, 0, width, height);

                                                                // Compress to JPEG 70% quality
                                                                resolve(canvas.toDataURL('image/jpeg', 0.7));
                                                            };
                                                            img.src = event.target.result;
                                                        };
                                                        reader.readAsDataURL(file);
                                                    });
                                                };

                                                const base64Promises = files.map(processImage);
                                                const base64Images = await Promise.all(base64Promises);

                                                setSettings(prev => ({
                                                    ...prev,
                                                    images: [...(prev.images || []), ...base64Images].slice(0, 5) // Limit to 5
                                                }));
                                            }}
                                        />
                                    </label>
                                </div>

                                {/* Preview Grid */}
                                {settings.images && settings.images.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        {settings.images.map((img, idx) => (
                                            <div key={idx} className="relative aspect-square group">
                                                <img src={img} alt="Memory" className="w-full h-full object-cover rounded-lg border border-white/10" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newImages = settings.images.filter((_, i) => i !== idx);
                                                        setSettings({ ...settings, images: newImages });
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Recipient Configuration */}
                            <div className="space-y-6">
                                <div className="group text-center">
                                    <label className="block text-xs uppercase tracking-widest text-pink-200/70 mb-2 font-medium">Who is it for?</label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        value={settings.recipientName}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border-b-2 border-white/20 hover:border-pink-400 focus:border-pink-500 rounded-lg px-4 py-3 text-center text-xl text-white placeholder-white/30 transition-all focus:outline-none focus:bg-black/30"
                                        placeholder="Name"
                                    />
                                </div>

                                <div className="group text-center">
                                    <label className="block text-xs uppercase tracking-widest text-pink-200/70 mb-2 font-medium">Their Email</label>
                                    <input
                                        type="email"
                                        name="recipientEmail"
                                        value={settings.recipientEmail}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border-b-2 border-white/20 hover:border-pink-400 focus:border-pink-500 rounded-lg px-4 py-3 text-center text-lg text-white placeholder-white/30 transition-all focus:outline-none focus:bg-black/30"
                                        placeholder="email@address.com"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <label className="block text-xs uppercase tracking-widest text-pink-200/70 mb-2 font-medium">When?</label>
                                        <input
                                            type="text"
                                            name="birthdayDate"
                                            value={settings.birthdayDate}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border-b-2 border-white/20 hover:border-pink-400 focus:border-pink-500 rounded-lg px-2 py-3 text-center text-lg text-white placeholder-white/30 transition-all focus:outline-none focus:bg-black/30"
                                            placeholder="MM-DD"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <label className="block text-xs uppercase tracking-widest text-pink-200/70 mb-2 font-medium">What Time?</label>
                                        <input
                                            type="time"
                                            name="birthdayTime"
                                            value={settings.birthdayTime}
                                            onChange={handleChange}
                                            className="w-full bg-black/20 border-b-2 border-white/20 hover:border-pink-400 focus:border-pink-500 rounded-lg px-2 py-3 text-center text-lg text-white placeholder-white/30 transition-all focus:outline-none focus:bg-black/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 space-y-3">
                            <Link
                                to="/"
                                target="_blank"
                                className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2 group"
                            >
                                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform text-cyan-300" />
                                <span>Preview Surprise</span>
                            </Link>



                            <button
                                type="submit"
                                disabled={status === 'saving'}
                                className="block w-full py-4 px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 rounded-xl text-white font-bold shadow-lg shadow-pink-500/30 transform hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                {status === 'saving' ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Calendar className="w-5 h-5" />
                                        <span>Finalize & Schedule</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Status Toast */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -bottom-16 left-0 right-0 mx-auto w-max bg-green-500 text-white px-6 py-2 rounded-full shadow-lg font-medium flex items-center gap-2"
                            >
                                <span>✨ Ready for launch!</span>
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -bottom-16 left-0 right-0 mx-auto w-max bg-red-500 text-white px-6 py-2 rounded-full shadow-lg font-medium"
                            >
                                <span>❌ Check backend connection</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.div >
        </div >
    );
};

export default AdminPanel;
