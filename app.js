const express = require('express');
const app = express();
const port = 3000;

/**
 * صارف کے ڈیٹا کو محفوظ بنانے والا فنکشن
 * یہ فنکشن کسی بھی خطرناک اسکرپٹ یا کوڈ کو سادہ ٹیکسٹ میں بدل دیتا ہے
 */
function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}

// آپ کا مین روٹ (Route)
app.get('/', (req, res) => {
    // صارف سے نام لینا، اگر نام نہ ہو تو 'Guest' استعمال کرنا
    const rawName = req.query.name || 'Guest';
    
    // ڈیٹا کو صاف (Sanitize) کرنا
    const safeName = escapeHTML(rawName);
    
    // اب یہ کوڈ مکمل طور پر محفوظ ہے
    res.send(`Hello, ${safeName}!`);
});

// سرور شروع کرنا
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
