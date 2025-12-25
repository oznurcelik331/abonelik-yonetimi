"use client"; // Form etkileşimleri ve tip uyumluluğu için eklendi

import { addSubscription } from "@/app/dashboard/actions";
import Link from "next/link";

export default function NewSubscriptionPage() {
  /**
   * TypeScript hatasını gidermek için sarmalayıcı fonksiyon.
   * addSubscription'dan dönen nesneyi burada yakalıyoruz,
   * böylece <form action> tip uyuşmazlığı yaşamıyor.
   */
  async function handleAction(formData: FormData) {
    const result = await addSubscription(formData);
    if (result?.error) {
      alert(result.error); // Basit bir hata bildirimi
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-black">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Yeni Abonelik Ekle
        </h1>

        <form action={handleAction} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Platform Adı
            </label>
            <input
              name="name"
              type="text"
              placeholder="Örn: Netflix"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Fiyat
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Para Birimi
              </label>
              <select
                name="currency"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white text-black font-semibold"
              >
                <option value="TL">TRY (₺)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">
              Başlangıç Tarihi
            </label>
            <input
              name="start_date"
              type="date"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white text-black"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-95"
            >
              Kaydet
            </button>
            <Link
              href="/dashboard"
              className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center transition-all"
            >
              İptal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
