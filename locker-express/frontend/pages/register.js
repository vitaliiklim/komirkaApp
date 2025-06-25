import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', { email, password });
    router.push('/login');
  }

  return (
    <form onSubmit={submit} className="p-4 flex flex-col max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Register</h1>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 mb-2" />
      <button className="bg-blue-500 text-white p-2">Register</button>
    </form>
  );
}
