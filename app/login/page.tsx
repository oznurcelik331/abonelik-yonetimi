import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Abonelik Takip
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Giriş yapın veya kayıt olun
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                name="email"
                type="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Email adresi"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                placeholder="Şifre"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              formAction={login}
              className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-500"
            >
              Giriş Yap
            </button>
            <button
              formAction={signup}
              className="w-full rounded-md bg-white py-2 text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
            >
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
