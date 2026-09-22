import React, { useEffect, useState } from 'react';
import { Crown, CheckCircle2, Clock, MapPin, Loader2 } from 'lucide-react';
import { subscribeToOrders, completeOrder } from '../config/firebase';

interface Order {
  id: string;
  type: string;
  tableNo: string;
  customName: string;
  ingredients: string[];
  status: string;
  createdAt: unknown;
}

const BarDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    // Ses efekti hazırlığı (Native Audio API)
    const playDing = () => {
      try {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play().catch(e => console.log('Audio play error', e));
      } catch { /* ignore audio play error */ }
    };

    let prevCount = 0;

    const unsubscribe = subscribeToOrders((newOrders) => {
      setOrders(newOrders as unknown as Order[]);
      setLoading(false);

      // Eğer yeni sipariş eklendiyse ses çal
      if (newOrders.length > prevCount) {
        playDing();
      }
      prevCount = newOrders.length;
    });

    // Eğer Firebase config bozuksa (mock) dinleme çalışmayacağından uyarı ver
    const timeout = setTimeout(() => {
      if (loading) {
        setConnectionError(true);
      }
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [loading]);

  const handleComplete = async (id: string) => {
    try {
      await completeOrder(id);
    } catch (error) {
      console.error("Sipariş tamamlanamadı", error);
      alert("Sipariş tamamlanamadı. Veritabanı bağlantınızı kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0805] text-white p-6 font-body">
      {/* Header */}
      <header className="flex items-center justify-between pb-6 border-b border-gold-900/30 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gold-900/20 rounded-xl">
            <Crown className="w-8 h-8 text-gold-500" />
          </div>
          <div>
            <h1 className="font-brand text-3xl text-gold-400">Hürrem Canlı Sipariş Paneli</h1>
            <p className="text-white/40 text-sm tracking-widest uppercase mt-1">Alchemist Özel Siparişleri (Bekleyen: {orders.length})</p>
          </div>
        </div>
        
        {/* Canlı bağlantı göstergesi */}
        <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-gold-500/20 rounded-full">
          <div className={`w-2 h-2 rounded-full ${connectionError ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
          <span className="text-xs uppercase tracking-wider text-white/50">
            {connectionError ? 'Bağlantı Yok / Config Eksik' : 'Canlı Bağlantı Aktif'}
          </span>
        </div>
      </header>

      {/* Sipariş Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {loading && !connectionError && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gold-500/50">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="uppercase tracking-widest text-sm">Siparişler Bekleniyor...</p>
          </div>
        )}

        {connectionError && orders.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-2xl max-w-lg text-center">
              <h3 className="text-red-400 font-semibold mb-2">Firebase Bağlantısı Bekleniyor</h3>
              <p className="text-white/60 text-sm">
                Canlı sipariş alabilmek için <code className="text-gold-400 bg-black/50 px-2 py-1 rounded">src/config/firebase.ts</code> dosyasındaki bilgileri kendi Firebase projenizle güncellemeniz gerekmektedir.
              </p>
            </div>
          </div>
        )}

        {/* Sipariş Kartları */}
        {orders.map((order) => (
          <div key={order.id} className="relative group bg-gradient-to-b from-[#1A1510] to-[#0A0805] border border-gold-900/40 rounded-2xl p-6 shadow-2xl hover:border-gold-500/50 transition-all duration-300">
            {/* Yanıp sönen yeni sipariş göstergesi */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 text-gold-400 font-display uppercase tracking-widest text-xs mb-2">
                  <Clock className="w-3 h-3" />
                  <span>Şimdi</span>
                </div>
                <h2 className="text-2xl font-brand text-white">{order.customName || 'İsimsiz Karışım'}</h2>
                <p className="text-white/40 text-sm mt-1">{order.type === 'shisha' ? 'Özel Nargile (22.90€)' : 'Signature Cocktail (15.90€)'}</p>
              </div>
            </div>

            {/* Masa No */}
            <div className="flex items-center gap-3 bg-gold-900/10 border border-gold-900/30 rounded-xl p-3 mb-6">
              <div className="bg-gold-500/20 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest">Teslimat Konumu</p>
                <p className="text-lg font-bold text-white">MASA {order.tableNo}</p>
              </div>
            </div>

            {/* İçerikler */}
            <div className="mb-8">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Seçilen İçerikler</p>
              <div className="flex flex-wrap gap-2">
                {order.ingredients.map((ing, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/80">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Buton */}
            <button
              onClick={() => handleComplete(order.id)}
              className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-black font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <CheckCircle2 className="w-5 h-5" />
              Siparişi Hazırla
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default BarDashboard;
