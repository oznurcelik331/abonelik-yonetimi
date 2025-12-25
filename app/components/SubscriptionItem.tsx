"use client";

import { deleteSubscription } from "@/app/dashboard/actions"; // Server Action içe aktarımı

export default function SubscriptionItem({ sub }: { sub: any }) {
  return (
    <li className="p-6 flex justify-between items-center hover:bg-indigo-50/30 transition-colors text-black">
      {/* SOL TARAF: Logo ve Abonelik Bilgileri */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
          <img
            src={`https://logo.clearbit.com/${sub.name
              .toLowerCase()
              .replace(/\s+/g, "")}.com`}
            alt={sub.name}
            className="w-8 h-8 object-contain"
            // Logo bulunamazsa UI-Avatars ile isimden ikon oluşturur
            onError={(e) => {
              (
                e.target as HTMLImageElement
              ).src = `https://ui-avatars.com/api/?name=${sub.name}&background=6366f1&color=fff`;
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{sub.name}</h3>
          <p className="text-sm text-gray-500 font-medium">{sub.start_date}</p>
        </div>
      </div>

      {/* SAĞ TARAF: Fiyat Bilgisi ve Silme Butonu */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xl font-black text-indigo-600">
            {sub.price}{" "}
            <span className="text-sm font-normal text-gray-400">
              {sub.currency}
            </span>
          </p>
        </div>

        {/* SİLME BUTONU (Çöp Kutusu İkonu) */}
        <button
          onClick={async () => {
            // Yanlışlıkla silmeleri önlemek için onay penceresi
            if (
              confirm(
                `"${sub.name}" aboneliğini silmek istediğinize emin misiniz?`
              )
            ) {
              await deleteSubscription(sub.id);
            }
          }}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
          title="Aboneliği Sil"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
