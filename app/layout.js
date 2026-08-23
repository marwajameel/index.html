import './globals.css';

export const metadata = {
  title: 'میری ویب سائٹ',
  description: 'خبروں اور دیگر معلومات کے لیے پلیٹ فارم',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl">
      <body>
        <header style={{ padding: '20px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <h2>خوش آمدید</h2>
        </header>
        <main style={{ padding: '20px' }}>{children}</main>
      </body>
    </html>
  );
}
