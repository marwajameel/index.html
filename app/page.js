import BasePayButton from '../components/BasePayButton';
import SolanaPayButton from '../components/SolanaPayButton';

export default function HomePage() {
  return (
    <main style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '10px' }}>SDN / مروہ کرپٹو پیمنٹ پورٹل</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>اپنی پسند کے نیٹ ورک کے ذریعے ادائیگی منتخب کریں:</p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Base Network Payment Button */}
        <div>
          <BasePayButton />
        </div>

        {/* Solana Network Payment Button */}
        <div>
          <SolanaPayButton />
        </div>
      </div>
    </main>
  );
}
