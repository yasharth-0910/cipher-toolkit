interface TextAreaProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  readOnly?: boolean
}

export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
}: TextAreaProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-300 mb-3 font-mono uppercase tracking-wide">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full px-4 py-3 bg-[#0f0f0f] border-2 border-[#2a2a2a] rounded-xl focus:border-[#ff6b6b] focus:outline-none transition-all resize-none h-32 text-white placeholder-gray-600 disabled:opacity-50 font-mono"
        disabled={readOnly}
      />
    </div>
  )
}
