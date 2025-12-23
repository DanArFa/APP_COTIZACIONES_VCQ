interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}

export default function FormSection({
  title,
  description,
  children,
  columns = 1,
}: FormSectionProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[columns];

  return (
    <div className="glass-section">
      <div className="mb-6">
        <h3 className="text-lg font-light text-glass-frost tracking-wide">{title}</h3>
        {description && (
          <p className="text-sm text-glass-frost/50 mt-1">{description}</p>
        )}
      </div>
      <div className={`grid ${gridClass} gap-5`}>
        {children}
      </div>
    </div>
  );
}
