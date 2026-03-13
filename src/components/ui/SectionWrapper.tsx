interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export default function SectionWrapper({ id, className = '', children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full py-36 md:py-56 px-6 md:px-12 text-cloud ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
