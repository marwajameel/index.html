'use client';
import React, { useState, useEffect } from 'react';

export default function SmartExchangeDashboard() {
  const [tradeLogs, setTradeLogs] = useState([]);
  const [botStatus, setBotStatus] = useState('Active');
  const [tpPercent, setTpPercent] = useState(50);
  const [slPercent, setSlPercent] = useState(-20);

  // لائیو نوٹیفکیشنز کی ریئل ٹائم اپڈیٹ
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const newLog = {
        id: Date.now(),
        time: now,
        token: 'PERCY',
        type: 'BUY',
        status: 'Success',
        amount: '0.05 SOL'
      };

      setTradeLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 4)]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '24px', backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* ہیڈر */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#38bdf8' }}>SDN Smart Exchange Dashboard</h1>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>jamil-wallet-app.vercel.app</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '8px 16px', borderRadius: '20px', border: '1px solid #22c55e' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>● سسٹم لائیو ہے ({botStatus})</span>
        </div>
      </div>

      {/* کنٹرول پینل */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '24px' }}>
        <div style={{ backgroundColor: '#131c2e', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#f1f5f9' }}>Take Profit (TP)</h3>
          <input 
            type="number" 
            value={tpPercent} 
            onChange={(e) => setTpPercent(e.target.value)}
            style={{ width: '90%', padding: '8px', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#22c55e', fontSize: '16px' }}
          /> %
        </div>

        <div style={{ backgroundColor: '#131c2e', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#f1f5f9' }}>Stop Loss (SL)</h3>
          <input 
            type="number" 
            value={slPercent} 
            onChange={(e) => setSlPercent(e.target.value)}
            style={{ width: '90%', padding: '8px', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#ef4444', fontSize: '16px' }}
          /> %
        </div>
      </div>

      {/* لائیو ٹریڈ لاگز */}
      <div style={{ marginTop: '32px', backgroundColor: '#131c2e', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#38bdf8' }}>لائیو اسمارٹ ٹریڈ نوٹیفکیشنز (Live Trade Alerts)</h3>
        {tradeLogs.length === 0 ? (
          <p style={{ color: '#64748b' }}>نئی ٹریڈ کا انتظار کیا جا رہا ہے...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tradeLogs.map((log) => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#0f172a', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
                <div>
                  <strong style={{ color: '#f8fafc' }}>[{log.time}]</strong> ٹوکن: <span style={{ color: '#38bdf8' }}>{log.token}</span> ({log.amount})
                </div>
                <div style={{ color: '#22c55e', fontWeight: 'bold' }}>
                  {log.type} - {log.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
