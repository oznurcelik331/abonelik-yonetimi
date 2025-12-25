import { redirect } from "next/navigation";

export default function Home() {
  // Ana sayfaya gelen herkesi otomatik olarak dashboard'a gönderir.
  // Eğer giriş yapmamışlarsa, dashboard içindeki kontrol onları login'e atacaktır.
  redirect("/dashboard");
}
