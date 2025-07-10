'use client';

export default function Input({ icon: Icon, placeholder, value, onChange, type = 'text' }) {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
      )}
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
