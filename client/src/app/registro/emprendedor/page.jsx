'use client';
import { useState } from 'react';
import Paso1 from './pasos/Paso1';
import Paso2 from './pasos/Paso2';
import Paso3 from './pasos/Paso3';

export default function RegistroEmprendedor() {
  const [paso, setPaso] = useState(1);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    emprendimiento: '',
    ubicacion: '',
    ruc: '',
    logo: null,
  });

  const avanzarPaso = () => setPaso((prev) => Math.min(prev + 1, 3));
  const retrocederPaso = () => setPaso((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-md">
      {paso === 1 && (
        <Paso1 formData={formData} setFormData={setFormData} onNext={avanzarPaso} />
      )}
      {paso === 2 && (
        <Paso2
          formData={formData}
          setFormData={setFormData}
          onNext={avanzarPaso}
          onBack={retrocederPaso}
        />
      )}
      {paso === 3 && (
        <Paso3
          formData={formData}
          setFormData={setFormData}
          onBack={retrocederPaso}
        />
      )}
    </div>
  );
}
