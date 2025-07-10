'use client';
import { loginUser, registerUser } from '../../services/auth'; // Importa las funciones de autenticación

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const result = await loginUser(
      formData.get('email'),
      formData.get('password')
    );

    if (result.success) {
      // Redirigir o actualizar estado global
      console.log('Login exitoso:', result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };


  return (
    <LayoutAuth>
      <div className="w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-2">Bienvenido</h2>
        <p className="mb-6 text-sm text-gray-600">Ingresa sesión a tu cuenta</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="px-4 py-2 border rounded-full text-sm"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="px-4 py-2 border rounded-full text-sm"
          />
          <button type="submit" className="bg-[#0B3B5B] text-white py-2 rounded-full">
            Iniciar Sesión
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-[#0B3B5B] underline">
            Regístrate
          </Link>
        </p>
      </div>
    </LayoutAuth>
  );
}
