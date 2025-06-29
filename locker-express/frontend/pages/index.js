import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Locker Express</h1>
      <Link href="/login" className="underline">
        Login
      </Link>
    </div>
  );
}
