"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Yeni bir abonelik eklemek için kullanılan Server Action.
 * @param formData Formdan gelen veriler (name, price, currency, start_date)
 */
export async function addSubscription(formData: FormData) {
  const supabase = await createClient();

  // 1. Kullanıcı oturumunu kontrol et
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!user) {
    redirect("/login");
  }

  // 2. Form verilerini değişkenlere ata ve tiplerini belirle
  const name = formData.get("name") as string;
  const price = formData.get("price");
  const currency = formData.get("currency") as string;
  const start_date = formData.get("start_date") as string;

  // 3. Supabase 'subscriptions' tablosuna veriyi yerleştir
  const { error } = await supabase.from("subscriptions").insert({
    name,
    price: Number(price),
    currency,
    start_date,
    user_id: user.id,
    active: true, // Abonelik varsayılan olarak aktif kaydedilir
  });

  // 4. Hata Yönetimi
  if (error) {
    console.error("Veritabanına ekleme hatası:", error.message);
    return { error: "Abonelik kaydedilemedi. Lütfen bilgileri kontrol edin." };
  }

  // 5. Önbellek Temizleme ve Yönlendirme
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

/**
 * Mevcut bir aboneliği silmek için kullanılan Server Action.
 * @param id Silinecek aboneliğin UUID'si
 */
export async function deleteSubscription(id: string) {
  const supabase = await createClient();

  // Veritabanından ilgili ID'ye sahip satırı sil
  const { error } = await supabase.from("subscriptions").delete().eq("id", id);

  if (error) {
    console.error("Silme hatası:", error.message);
    return { error: "Abonelik silinemedi." };
  }

  // Veri silindiği için dashboard önbelleğini temizle ve sayfayı güncelle
  revalidatePath("/dashboard");
}
