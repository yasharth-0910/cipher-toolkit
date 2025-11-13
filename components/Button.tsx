import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group font-mono uppercase tracking-wider text-sm';
  
  const variantClasses =
    variant === 'primary'
      ? 'bg-[#ff6b6b] text-white hover:bg-[#ff5252] border-2 border-[#ff6b6b]'
      : 'bg-transparent text-[#4ecdc4] hover:bg-[#4ecdc4] hover:text-[#0f0f0f] border-2 border-[#4ecdc4]';

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02, y: -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {/* Shine effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
