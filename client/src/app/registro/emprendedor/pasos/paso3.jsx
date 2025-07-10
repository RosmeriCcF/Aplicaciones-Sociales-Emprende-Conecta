'use client'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'; //  importar router

export default function Paso3({ formData, setFormData, onBack }) {

    const router = useRouter(); 

    const handleFinalizar = (e) => {
      e.preventDefault();
  
      console.log('Datos del formulario:', formData);
     
  
      router.push('/home'); 
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, logo: file });
    };

  return (
    <form onSubmit={handleFinalizar}
    className="flex flex-col items-center text-center space-y-6 w-full max-w-xs"
    >
      <div className="flex justify-center gap-4">
        <div className="w-8 h-8 rounded-full bg-[#0B3B5B] text-white flex items-center justify-center text-sm">1</div>
        <div className="w-8 h-8 rounded-full bg-[#0B3B5B] text-white flex items-center justify-center text-sm">2</div>
        <div className="w-8 h-8 rounded-full bg-[#0B3B5B] text-white flex items-center justify-center text-sm">3</div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-1">Logo del emprendimiento</h2>
        <p className="text-sm text-gray-500">Sube una imagen representativa de tu marca</p>
      </div>

      <label
        htmlFor="logo"
        className="border-2 border-gray-300 border-dashed rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition"
      >
        <PhotoIcon className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-sm text-gray-400">
          {formData.logo?.name || 'Selecciona un archivo'}
        </span>
        <input type="file" id="logo" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>

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
          Finalizar
        </button>
      </div>
    </form>
  )
}
