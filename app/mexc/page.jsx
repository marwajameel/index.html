"use client";
import React, { useState, useEffect } from "react";

export default function MexcPage() {
  const DEFAULT_SECRET = "7aeb6c1d53144a010db6f148f008e9d4fd373b9cc3b9057855957f428de438f5";
  const DEFAULT_TOKEN = "hk_m_eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5YWRiMGIxYTdlNzYxNzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJsb25nYnJpZGdlIiwic3ViIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNzk1NDM5ODYwLCJpYXQiOjE3OTI4NDc4NjAsImFrIjoiaGtfOGM4NjgzZDIwY2U3MDlmNzFmYjJhMGZmMTBjMDUwMDAiLCJhYWlkIjoyMTY2MjQxMCwiYWMiOiJzZ19tZXhjIiwibWlkIjozNDA2MzU2OCwic2lkIjoiZEtqRmliM3FjZ3h6eFA3WUpmUlFlQT09IiwiYmwiOi0xLCJ1bCI6MCwiaWsiOiJzZ19tZXhjXzIxNjYyNDEwIiwicmVnaW9uX2hvbWUiOiJoayJ9.rIY4U4oGM1mfNXKvxXqnboJNQZh4RLha2K_5IZ9lYIkAMe_raeSL_jroJuu-NI-5fbHT0O6iLtNjwTAUiu4hbepXachy7U60rUeOttTvJrMV4E9MFwGVz7gOSvFY9sVJDKVM1PDcOhqToyfMAhIUtVw1HCxY9gyCN33AUes04O01HaUx-xFoHJSnTBHZEogP5caTu0t9pquIHfzNmHyeOKelqRklF2xDd6kJr_To1c1ZCJx6JCUXM0Ag1ASU3rkVQman3uVWHMdyvaxIHK4fPEZCeTYAas1F0DY15oGhuUl1jMroIPqY7VNvPoCO1MLYLGyrfNIqc2m0DR6vGsZqjPCBKOS2y_xUnW0kUFTqwYZGEaCJdPhF6VrAFJFnbpfcOASgTgPQ0eURDWWKGPlDgdBOs46_XKdKzGR3e1Y-Q3U-ufeoU5wWirM6er-AXDrEf3F2he60DMlTSlbfnT8faA6tmw4xWNh7g2dmJ5tG1jcBIi_8NQDfPasWoisFk8M8jHBAWg1jcbIodwk223d0nNO7s5zVoM6qk52YB_8FqDzaVgBCn7v__GYOHx8MEdPQ8YiqINHSe2NKbvDXKAev0Ab88o9vwk56PQxoMSU5U9PRJMzRFtmlX6QCVq-_TgjG8P2MXzi43A1KgOjwpUSbHuLDcHwoSdtg7Xw_Tc07HUM";

  const [secretKey, setSecretKey] = useState(DEFAULT_SECRET);
  const [tokenKey, setTokenKey] = useState(DEFAULT_TOKEN);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedSecret = localStorage.getItem("mexc_secret");
    const savedToken = localStorage.getItem("mexc_token");
    if (savedSecret) setSecretKey(savedSecret);
    if (savedToken) setTokenKey(savedToken);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!secretKey || !tokenKey) {
      alert("براہ کرم دونوں API کیز درج کریں!");
      return;
    }

    localStorage.setItem("mexc_secret", secretKey);
    localStorage.setItem("mexc_token", tokenKey);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0d1117",
      color: "#f0f6fc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "520px",
        backgroundColor: "#161b22",
        border: "1px solid #30363d",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)"
      }}>
        <h2 style={{
          fontSize: "20px",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "20px",
          color: "#58a6ff"
        }}>
          MEXC API Manager — Mj04
        </h2>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#8b949e" }}>
              Access_Key_Secret
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter Access Key Secret"
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: "6px",
                color: "#f0f6fc",
                fontSize: "14px",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#8b949e" }}>
              Access_Key_Token
            </label>
            <textarea
              rows={4}
              value={tokenKey}
              onChange={(e) => setTokenKey(e.target.value)}
              placeholder="Enter Access Key Token"
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: "6px",
                color: "#f0f6fc",
                fontSize: "13px",
                outline: "none",
                resize: "vertical",
                fontFamily: "monospace"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#238636",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.2s ease"
            }}
          >
            Save API Keys
          </button>
        </form>

        {isSaved && (
          <div style={{
            marginTop: "16px",
            padding: "10px",
            backgroundColor: "rgba(46, 160, 67, 0.15)",
            border: "1px solid #2ea043",
            borderRadius: "6px",
            color: "#3fb950",
            textAlign: "center",
            fontSize: "14px"
          }}>
            ✅ کیز کامیابی کے ساتھ مقامی طور پر محفوظ ہو گئی ہیں!
          </div>
        )}
      </div>
    </div>
  );
}
