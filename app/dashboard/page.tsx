import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AnalyticsChart from "@/app/components/AnalyticsChart";
import SubscriptionItem from "@/app/components/SubscriptionItem";
import PieAnalytics from "@/app/components/PieAnalytics"; // Yeni bileşen import edildi

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Kullanıcı oturum kontrolü
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Abonelik verilerini başlangıç tarihine göre getir
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("*")
    .order("start_date", { ascending: true });

  // 3. Hesaplamalar ve Grafik Verisi Hazırlama

  // Toplam aylık harcamayı hesapla
  const totalMonthly =
    subscriptions?.reduce((acc, sub) => acc + Number(sub.price), 0) || 0;

  // Çizgi/Sütun grafik için veri
  const chartData =
    subscriptions?.map((sub) => ({
      name: sub.name,
      price: Number(sub.price),
    })) || [];

  // Pasta grafik için platform bazlı veri
  const pieData =
    subscriptions?.map((sub) => ({
      name: sub.name,
      value: Number(sub.price),
    })) || [];

  return (
    <div className="min-h-screen bg-white p-8 text-black">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Üst Bilgi Paneli */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600">
              Abonelik Takip
            </h1>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          <Link
            href="/dashboard/new"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 shadow-md transition-all"
          >
            Yeni Ekle +
          </Link>
        </div>

        {/* Özet Kartları ve Görselleştirme */}
        {subscriptions && subscriptions.length > 0 && (
          <div className="space-y-6">
            {/* Grafik Alanı: İki Kolonlu Düzen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mevcut Bar/Çizgi Grafik Alanı */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm text-black">
                <h3 className="text-sm font-bold text-gray-700 mb-4">
                  Harcama Dağılımı (Bar)
                </h3>
                <AnalyticsChart data={chartData} />
              </div>

              {/* Yeni Pasta Grafik Alanı */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm text-black">
                <h3 className="text-sm font-bold text-gray-700 mb-4">
                  Harcama Oranları (Pasta)
                </h3>
                <PieAnalytics data={pieData} />
              </div>
            </div>

            {/* Toplam Harcama Özet Kartı (Yeni Stil) */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg flex justify-between items-center">
              <div>
                <p className="text-indigo-100 font-medium">
                  Toplam Aylık Ödeme
                </p>
                <h2 className="text-4xl font-black">
                  {totalMonthly.toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  TL
                </h2>
              </div>
              <div className="text-5xl opacity-20">💰</div>
            </div>
          </div>
        )}

        {/* Abonelik Listesi */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {subscriptions && subscriptions.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {subscriptions.map((sub) => (
                <SubscriptionItem key={sub.id} sub={sub} />
              ))}
            </ul>
          ) : (
            <div className="p-20 text-center text-black">
              <div className="mb-4 text-gray-300 flex justify-center text-6xl">
                📊
              </div>
              <p className="text-gray-500 font-medium italic">
                Henüz bir abonelik eklemediniz.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
