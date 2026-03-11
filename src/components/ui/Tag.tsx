interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span className={`text-xs uppercase tracking-widest text-mist font-medium ${className}`}>
      {children}
    </span>
  );
}
