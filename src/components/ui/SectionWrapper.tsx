interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export default function SectionWrapper({ id, className = '', children, dark = false }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full py-24 md:py-32 px-6 md:px-12 ${
        dark ? 'bg-slate/90 backdrop-blur-sm text-cloud' : 'bg-void/80 backdrop-blur-sm text-cloud'
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
