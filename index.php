<?php
// Fast Server Headers & CORS Setup
header("Access-Control-Allow-Origin: *");
header("Cache-Control: no-cache, must-revalidate, max-age=0");
if (!ob_start("ob_gzhandler")) ob_start();
?>
<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Streaming - SDN News</title>
    
    <!-- Lightweight Fast HLS Library -->
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #0d1117; color: #fff; font-family: system-ui, -apple-system, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 10px; }
        .stream-card { width: 100%; max-width: 850px; background: #161b22; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.5); border: 1px solid #30363d; }
        .video-wrapper { position: relative; width: 100%; padding-top: 56.25%; background: #000; }
        video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        .status-bar { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; background: #21262d; }
        .live-tag { background: #da3633; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: bold; animation: blink 1.5s infinite; }
        @keyframes blink { 50% { opacity: 0.5; } }
    </style>
</head>
<body>

<div class="stream-card">
    <div class="video-wrapper">
        <video id="livePlayer" controls autoplay playsinline muted></video>
    </div>
    <div class="status-bar">
        <span class="live-tag">LIVE</span>
        <span id="ipDisplay">IP ڈیٹیکٹ ہو رہا ہے...</span>
    </div>
</div>

<script>
    // 1. Live Stream URL (یہاں اپنا .m3u8 لنک ڈالیں)
    const streamUrl = 'https://your-domain.com/live/stream.m3u8';
    const video = document.getElementById('livePlayer');

    // 2. User IP & Device Detection (Ultra Lightweight)
    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            document.getElementById('ipDisplay').innerText = "آپ کا IP: " + data.ip;
        })
        .catch(() => {
            document.getElementById('ipDisplay').innerText = "لائیو سٹریمنگ فعال ہے";
        });

    // 3. High-Performance HLS Player Logic
    if (Hls.isSupported()) {
        const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            maxBufferLength: 5,        // رام اور فون پر بوجھ کم رکھنے کے لیے
            backBufferLength: 15
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => console.log("Autoplay blocked by browser policy"));
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari / iPhone Support
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
    }
</script>

</body>
</html>
