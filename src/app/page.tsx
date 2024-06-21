import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-full max-w-[400px] flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-4xl font-bold">
                <span className="text-red-500">💥</span>
                <span className="text-blue-500">💥</span>
                <span className="text-green-500">💥</span>
              </div>
              <div className="text-2xl font-bold">
                <span className="text-red-500">💥</span>
                <span className="text-blue-500">💥</span>
                <span className="text-green-500">💥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
