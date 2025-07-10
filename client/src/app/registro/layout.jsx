export default function RegistroLayout({ children }) {
    return (
      <div className="min-h-screen flex">
        {/* Izquierda: fondo y logo */}
        <div className="w-1/2 bg-[#0B3B5B] flex flex-col justify-center items-center text-white px-8">
          <img src="/logo.png" alt="Logo" className="w-16 mb-4" />
          <h1 className="text-2xl font-bold">E&C</h1>
          <p className="text-center mt-2 text-sm">
            Conecta con emprendedores peruanos y descubre <br />
            productos únicos cerca de ti.
          </p>
        </div>
  
        {/* Derecha: contenido según la ruta */}
        <div className="w-1/2 bg-white flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }
  