import React, { useState } from 'react';
import { MOCK_CALL_LOGS } from '../data/callLogs';
import { MOCK_VIRTUAL_NUMBERS } from '../data/virtualNumbers';
import { CallLog, VirtualNumber } from '../types';
import {
  PhoneCall,
  ShieldCheck,
  Mic,
  Play,
  Pause,
  Download,
  PhoneForwarded,
  Settings,
  Plus,
  Volume2,
  PhoneOff,
  UserCheck,
  Tag,
  Clock,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Search,
  Filter,
} from 'lucide-react';

interface DashboardPreviewProps {
  onBuyMoreNumbers: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ onBuyMoreNumbers }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'numbers' | 'recordings' | 'dialer'>('overview');
  const [callLogs, setCallLogs] = useState<CallLog[]>(MOCK_CALL_LOGS);
  const [myVirtualNumbers, setMyVirtualNumbers] = useState<VirtualNumber[]>([
    MOCK_VIRTUAL_NUMBERS[0],
    MOCK_VIRTUAL_NUMBERS[1],
  ]);

  // Audio Player State
  const [playingLogId, setPlayingLogId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  // Web Dialer State
  const [dialPadNumber, setDialPadNumber] = useState<string>('');
  const [activeVirtualDialLine, setActiveVirtualDialLine] = useState<string>(myVirtualNumbers[0]?.displayFormat || '+91 (011) 4988 7700');
  const [isCallingNow, setIsCallingNow] = useState<boolean>(false);
  const [callTimer, setCallTimer] = useState<number>(0);
  const [callTimerInterval, setCallTimerInterval] = useState<any>(null);

  // Toggle Call Masking for a specific number
  const toggleMasking = (id: string) => {
    setMyVirtualNumbers((prev) =>
      prev.map((vn) => {
        if (vn.id === id) {
          const updatedFeatures = vn.features.map((f) =>
            f.includes('Call Masking') ? (f.includes('Active') ? 'Smart Call Masking (Disabled)' : 'Smart Call Masking (Active)') : f
          );
          return { ...vn, features: updatedFeatures };
        }
        return vn;
      })
    );
  };

  // Play audio simulation
  const handlePlayAudio = (logId: string) => {
    if (playingLogId === logId) {
      setPlayingLogId(null);
      return;
    }
    setPlayingLogId(logId);
    setAudioProgress(10);

    // Audio context beep sound effect
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio fallback
    }

    let p = 10;
    const interval = setInterval(() => {
      p += 10;
      setAudioProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setPlayingLogId(null);
      }
    }, 600);
  };

  // Start Call from Web Dialer
  const handleStartCall = () => {
    if (!dialPadNumber || dialPadNumber.length < 5) {
      alert('Please enter a valid phone number to call!');
      return;
    }
    setIsCallingNow(true);
    setCallTimer(0);
    const interval = setInterval(() => {
      setCallTimer((prev) => prev + 1);
    }, 1000);
    setCallTimerInterval(interval);
  };

  const handleEndCall = () => {
    if (callTimerInterval) clearInterval(callTimerInterval);
    setIsCallingNow(false);

    // Add new call log
    const newLog: CallLog = {
      id: `cl-${Date.now()}`,
      virtualNumber: activeVirtualDialLine,
      customerNumberMasked: dialPadNumber.slice(0, 3) + 'XXX XX' + dialPadNumber.slice(-3),
      customerNumberReal: dialPadNumber,
      direction: 'outgoing',
      durationSeconds: callTimer,
      timestamp: 'Just now',
      recordingUrl: 'mock-new-audio',
      hasRecording: true,
      isMasked: true,
      status: 'completed',
      agentName: 'You (SellersLogin Web Dialer)',
      tags: ['Outgoing Call', 'Masked & Recorded'],
      notes: `Call placed using virtual line ${activeVirtualDialLine}. Personal SIM stay private.`,
      audioWaveform: [20, 50, 80, 60, 90, 40, 70, 85, 90, 60, 40, 80, 50, 30, 60, 80, 40, 20],
    };

    setCallLogs([newLog, ...callLogs]);
    setDialPadNumber('');
    alert('Call ended! Recording saved to SellersLogin Dashboard.');
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8 border-t border-purple-100">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Dashboard Top Banner */}
        <div className="bg-gradient-to-r from-purple-50 via-purple-100/60 to-indigo-50 border border-purple-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-600/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-gray-900">SellersLogin Client Dashboard</h1>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  KYC Verified
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium">
                Manage your active Indian Virtual Numbers, Call Masking Shield, and Audio Recordings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSubTab('dialer')}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Web Dialer
            </button>
            <button
              onClick={onBuyMoreNumbers}
              className="bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Buy Virtual Number
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-purple-100 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'overview'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-purple-700 bg-white border border-purple-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Overview Analytics
          </button>

          <button
            onClick={() => setActiveSubTab('numbers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'numbers'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-purple-700 bg-white border border-purple-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            My Virtual Lines ({myVirtualNumbers.length})
          </button>

          <button
            onClick={() => setActiveSubTab('recordings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'recordings'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-purple-700 bg-white border border-purple-100'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-indigo-600" />
            Call Logs & Recordings ({callLogs.length})
          </button>

          <button
            onClick={() => setActiveSubTab('dialer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'dialer'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-purple-700 bg-white border border-purple-100'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
            Web Calling Dialer
          </button>
        </div>

        {/* SUBTAB 1: OVERVIEW */}
        {activeSubTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-purple-100 rounded-2xl p-5 space-y-2 shadow-xs hover:border-purple-300">
                <div className="flex items-center justify-between text-xs text-gray-500 font-bold">
                  <span>Active Virtual Lines</span>
                  <PhoneCall className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-gray-900 font-mono">{myVirtualNumbers.length}</div>
                <p className="text-[11px] text-purple-800 font-semibold">+91 080 Bangalore & +91 022 Mumbai</p>
              </div>

              <div className="bg-white border border-purple-100 rounded-2xl p-5 space-y-2 shadow-xs hover:border-purple-300">
                <div className="flex items-center justify-between text-xs text-gray-500 font-bold">
                  <span>Call Masking Protection</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-700 font-mono">100% Active</div>
                <p className="text-[11px] text-gray-500">Personal SIM stay hidden</p>
              </div>

              <div className="bg-white border border-purple-100 rounded-2xl p-5 space-y-2 shadow-xs hover:border-purple-300">
                <div className="flex items-center justify-between text-xs text-gray-500 font-bold">
                  <span>Recorded Audio Storage</span>
                  <Mic className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-black text-gray-900 font-mono">24.5 Hrs</div>
                <p className="text-[11px] text-indigo-700 font-semibold">HD MP3 Saved in Cloud</p>
              </div>

              <div className="bg-white border border-purple-100 rounded-2xl p-5 space-y-2 shadow-xs hover:border-purple-300">
                <div className="flex items-center justify-between text-xs text-gray-500 font-bold">
                  <span>Total Calls Managed</span>
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-gray-900 font-mono">482</div>
                <p className="text-[11px] text-emerald-700 font-semibold">98.4% COD Delivery Rate</p>
              </div>
            </div>

            {/* Recent Calls Preview Table */}
            <div className="bg-white border border-purple-100 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-purple-600" />
                  Recent Masked Call Recordings
                </h3>
                <button
                  onClick={() => setActiveSubTab('recordings')}
                  className="text-xs text-purple-700 hover:underline font-bold"
                >
                  View All Recordings â†’
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-purple-50 text-gray-700 border-b border-purple-100 font-mono font-bold">
                    <tr>
                      <th className="p-3">Virtual Number</th>
                      <th className="p-3">Buyer Number</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Agent</th>
                      <th className="p-3">Recording Player</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {callLogs.slice(0, 3).map((log) => (
                      <tr key={log.id} className="hover:bg-purple-50/40">
                        <td className="p-3 font-mono font-bold text-gray-900">{log.virtualNumber}</td>
                        <td className="p-3 font-mono text-purple-800 font-bold">
                          {log.customerNumberMasked} <span className="text-[10px] bg-purple-100 text-purple-800 border border-purple-200 px-1.5 py-0.5 rounded font-bold">Masked</span>
                        </td>
                        <td className="p-3 text-gray-600 font-medium">{Math.floor(log.durationSeconds / 60)}m {log.durationSeconds % 60}s</td>
                        <td className="p-3 text-gray-600 font-medium">{log.agentName}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handlePlayAudio(log.id)}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 px-3 py-1 rounded-lg flex items-center gap-1 font-bold cursor-pointer"
                          >
                            {playingLogId === log.id ? <Pause className="w-3 h-3 text-purple-800" /> : <Play className="w-3 h-3 text-purple-800" />}
                            <span>{playingLogId === log.id ? `${audioProgress}%` : 'Play MP3'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 2: MY VIRTUAL LINES */}
        {activeSubTab === 'numbers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">Assigned Indian Virtual Phone Lines</h3>
                <p className="text-xs text-gray-500 font-medium">Manage forwarding numbers, IVR greeting, and Call Masking status</p>
              </div>
              <button
                onClick={onBuyMoreNumbers}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs cursor-pointer"
              >
                + Add Virtual Number
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myVirtualNumbers.map((vn) => (
                <div key={vn.id} className="bg-white border border-purple-100 rounded-3xl p-6 space-y-4 shadow-xs hover:border-purple-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gray-500 uppercase">{vn.city} Virtual Line</span>
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      Line Active
                    </span>
                  </div>

                  <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-1">
                    <div className="text-xs text-purple-800 font-bold">Virtual Caller ID</div>
                    <div className="text-2xl font-black font-mono text-gray-900">{vn.displayFormat}</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                      <span className="text-gray-500 font-medium">Forwarding Calls To:</span>
                      <span className="font-mono text-gray-800 font-bold">+91 98765 43210 (Personal SIM)</span>
                    </div>

                    <div className="flex items-center justify-between bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                      <span className="text-gray-700 font-semibold">Call Masking Shield:</span>
                      <button
                        onClick={() => toggleMasking(vn.id)}
                        className="text-purple-900 font-extrabold bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-300 hover:bg-purple-200 cursor-pointer"
                      >
                        100% Enabled (Toggle)
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                      <span className="text-gray-500 font-medium">Auto Recording:</span>
                      <span className="text-purple-800 font-mono font-bold">Enabled (MP3 Cloud)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-purple-100 font-medium">
                    <span>Renewal Plan: â‚¹499 + GST</span>
                    <button className="text-purple-700 font-bold hover:underline cursor-pointer">Line Settings</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 3: CALL LOGS & RECORDINGS */}
        {activeSubTab === 'recordings' && (
          <div className="bg-white border border-purple-100 rounded-3xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                  <Mic className="w-5 h-5 text-purple-600" />
                  Call Recording Library & Transcripts
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Every order confirmation or customer call is saved in high-definition audio for dispute proof.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-bold">Storage Used: 24.5 / 100 Hours</span>
              </div>
            </div>

            <div className="space-y-4">
              {callLogs.map((log) => (
                <div key={log.id} className="bg-white border border-purple-100 rounded-2xl p-5 space-y-3 hover:border-purple-200 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                        {log.direction === 'incoming' ? 'â†™' : 'â†—'}
                      </div>
                      <div>
                        <div className="font-black text-gray-900 text-sm font-mono">{log.customerNumberMasked}</div>
                        <div className="text-[11px] text-gray-500 font-medium">Via Virtual Line: {log.virtualNumber}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      <span>{log.timestamp}</span>
                      <span>â€¢</span>
                      <span className="font-mono">{Math.floor(log.durationSeconds / 60)}m {log.durationSeconds % 60}s</span>
                    </div>
                  </div>

                  {/* Audio Waveform Player */}
                  <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200 flex items-center gap-4">
                    <button
                      onClick={() => handlePlayAudio(log.id)}
                      className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center font-bold transition-transform hover:scale-105 shrink-0 cursor-pointer"
                    >
                      {playingLogId === log.id ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-gray-600 font-mono font-bold">
                        <span>{playingLogId === log.id ? `Playing (${audioProgress}%)` : 'Ready to play'}</span>
                        <span>02:22 mins MP3</span>
                      </div>
                      <div className="flex items-end gap-1 h-6">
                        {log.audioWaveform.map((val, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${val}%` }}
                            className={`flex-1 rounded-full transition-all ${
                              playingLogId === log.id && (idx / log.audioWaveform.length) * 100 <= audioProgress
                                ? 'bg-purple-600'
                                : 'bg-purple-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <a
                      href="#download"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Downloading MP3 Call Recording for ${log.customerNumberMasked}`);
                      }}
                      className="p-2.5 bg-white hover:bg-purple-50 text-gray-800 rounded-xl border border-purple-200 text-xs flex items-center gap-1 shrink-0 font-bold cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-purple-600" />
                      <span className="hidden sm:inline">MP3</span>
                    </a>
                  </div>

                  {/* Notes & Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-purple-600" />
                      {log.tags.map((tg, i) => (
                        <span key={i} className="bg-purple-50 border border-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          {tg}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-500 text-[11px] italic">"{log.notes}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 4: WEB DIALER */}
        {activeSubTab === 'dialer' && (
          <div className="max-w-xl mx-auto bg-white border border-purple-200 rounded-3xl p-6 space-y-6 shadow-md">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-extrabold text-gray-900 flex items-center justify-center gap-2">
                <PhoneCall className="w-5 h-5 text-purple-600" />
                SellersLogin Web Calling Dialer
              </h3>
              <p className="text-xs text-gray-500 font-medium">Place calls directly from your browser with 100% Call Masking</p>
            </div>

            {/* Select Caller ID Line */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Select Virtual Caller ID Line:</label>
              <select
                value={activeVirtualDialLine}
                onChange={(e) => setActiveVirtualDialLine(e.target.value)}
                className="w-full bg-purple-50 border border-purple-200 text-xs text-purple-900 font-mono font-extrabold p-3 rounded-xl outline-none cursor-pointer"
              >
                {myVirtualNumbers.map((vn) => (
                  <option key={vn.id} value={vn.displayFormat} className="bg-white text-gray-900 font-bold">
                    {vn.displayFormat} ({vn.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Dial Input Display */}
            <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-4 text-center space-y-1">
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Target Buyer Number</div>
              <input
                type="text"
                value={dialPadNumber}
                onChange={(e) => setDialPadNumber(e.target.value)}
                placeholder="+91 98765 XXXXX"
                className="w-full bg-transparent text-center text-2xl font-mono font-black text-gray-900 outline-none"
              />
            </div>

            {/* Keypad Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((num) => (
                <button
                  key={num}
                  onClick={() => setDialPadNumber((prev) => prev + num)}
                  className="bg-white hover:bg-purple-50 text-gray-900 font-mono font-black text-lg py-3 rounded-2xl border border-purple-200 active:scale-95 transition-all shadow-2xs cursor-pointer"
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Call Actions */}
            {isCallingNow ? (
              <div className="bg-purple-50 border border-purple-300 p-4 rounded-2xl text-center space-y-3 animate-pulse">
                <div className="text-xs text-purple-900 font-black">
                  Call Connected via {activeVirtualDialLine}
                </div>
                <div className="text-2xl font-mono font-black text-gray-900">
                  00:{callTimer < 10 ? `0${callTimer}` : callTimer}
                </div>
                <div className="text-[11px] text-purple-700 font-bold flex items-center justify-center gap-1">
                  <Mic className="w-3.5 h-3.5 animate-bounce text-purple-600" /> Recording active in SellersLogin Cloud
                </div>

                <button
                  onClick={handleEndCall}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" /> End Call
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDialPadNumber('')}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-3 rounded-xl font-bold cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={handleStartCall}
                  className="w-2/3 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm py-3 rounded-xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 fill-white" /> Start Masked Call
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};


