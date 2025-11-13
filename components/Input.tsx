interface InputProps {
  label: string
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'number'
}

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-300 mb-3 font-mono uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#0f0f0f] border-2 border-[#2a2a2a] rounded-xl focus:border-[#4ecdc4] focus:outline-none transition-all text-white placeholder-gray-600 font-mono"
      />
    </div>
  )
}
