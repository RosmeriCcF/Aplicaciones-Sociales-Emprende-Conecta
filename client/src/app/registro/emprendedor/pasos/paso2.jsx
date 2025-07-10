'use client'
import { BriefcaseIcon, MapPinIcon, IdentificationIcon } from '@heroicons/react/24/outline'

export default function Paso2({ formData, setFormData, onNext, onBack }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onNext()
      }}
      className="flex flex-col items-center text-center space-y-6 w-full max-w-xs"
    >
      <div className="flex justify-center gap-4">
        <div className="w-8 h-8 rounded-full bg-[#0B3B5B] text-white flex items-center justify-center text-sm">1</div>
        <div className="w-8 h-8 rounded-full bg-[#0B3B5B] text-white flex items-center justify-center text-sm">2</div>
        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm">3</div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-1">Registro</h2>
        <p className="text-sm text-gray-500">Completa los datos de tu emprendimiento</p>
      </div>

      <Input
        icon={BriefcaseIcon}
        placeholder="Nombre del emprendimiento"
        value={formData.emprendimiento}
        onChange={(e) => setFormData({ ...formData, emprendimiento: e.target.value })}
      />
      <Input
        icon={MapPinIcon}
        placeholder="Ubicación"
        value={formData.ubicacion}
        onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
      />
      <Input
        icon={IdentificationIcon}
        placeholder="RUC"
        value={formData.ruc}
        onChange={(e) => setFormData({ ...formData, ruc: e.target.value })}
      />

      <div className="flex gap-2 w-full">
        <button
          type="button"
          onClick={onBack}
          className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-full text-sm hover:bg-gray-300 transition"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="w-1/2 bg-[#0B3B5B] text-white py-3 rounded-full text-sm hover:bg-[#072a41] transition"
        >
          Siguiente
        </button>
      </div>
    </form>
  )
}

function Input({ icon: Icon, placeholder, value, onChange }) {
  return (
    <div className="relative w-full">
      <Icon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3B5B]"
      />
    </div>
  )
}
