'use client'; // Habilita el rendering del lado del cliente (indispensable para usar hooks como useState o useRouter)

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Permite redireccionar a otra ruta luego del registro
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Input from '@/app/components/ui/Input'; // Componente reutilizable de input con ícono (ajustar si se mueve fuera de /app)

export default function ClienteRegistro() {
  // Estado local que almacena los datos del formulario de registro
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const router = useRouter(); // Hook de Next.js para redirección programática

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 👉 Punto de integración con backend:
      // Aquí se realiza una solicitud POST al endpoint correspondiente con los datos del nuevo usuario

      /*
      const res = await fetch('/api/registro-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Registro fallido');
      */

      console.log('Datos enviados:', formData); // ⚙️ Mientras se conecta el backend, se imprime por consola

      // ✅ Redirección automática a la página principal tras registro exitoso
      router.push('/home');
    } catch (err) {
      console.error('Error durante el registro:', err);
      // 🔴 Aquí puede mostrarse una alerta visual en caso de fallo (a implementar)
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Registro</h2>
      <p className="text-sm text-gray-500">Completa tus datos personales</p>

      {/* Formulario controlado con inputs personalizados */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          icon={UserIcon}
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <Input
          icon={EnvelopeIcon}
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          icon={LockClosedIcon}
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        {/* Botón de envío del formulario */}
        <button type="submit" className="bg-[#0B3B5B] text-white py-2 rounded-full">
          Registrarse
        </button>
      </form>
    </div>
  );
}
