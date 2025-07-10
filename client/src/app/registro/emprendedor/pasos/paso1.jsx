'use client'
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'

export default function Paso1({ formData, setFormData, onNext }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="flex flex-col items-center text-center space-y-6 w-full max-w-xs"
    >
      {/* Indicador visual */}
      <div className="flex justify-center gap-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              n === 1 ? 'bg-[#0B3B5B] text-white' : 'bg-gray-300 text-gray-600'
            }`}
          >
            {n}
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-1">Registro</h2>
        <p className="text-sm text-gray-500">Completa tus datos personales</p>
      </div>

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

      <button
        type="submit"
        className="w-full bg-[#0B3B5B] text-white py-3 rounded-full text-sm hover:bg-[#072a41] transition"
      >
        Siguiente
      </button>
    </form>
  );
}

function Input({ icon: Icon, placeholder, value, onChange, type = 'text' }) {
  return (
    <div className="relative w-full">
      <Icon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B5B]"
      />
    </div>
  );
}
