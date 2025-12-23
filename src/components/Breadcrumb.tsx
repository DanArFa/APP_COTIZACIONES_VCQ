import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-1 mb-6 text-sm px-1">
      <button
        onClick={() => navigate('/app/admin')}
        className="
          flex items-center gap-2 px-3 py-1.5 rounded-lg
          text-glass-frost/60 hover:text-glass-cyan
          transition-all duration-200 hover:bg-white/5
          group
        "
        title="Dashboard"
      >
        <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline text-xs font-medium tracking-wide">Inicio</span>
      </button>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-glass-frost/30" />
          {item.path ? (
            <button
              onClick={() => navigate(item.path!)}
              className="
                px-3 py-1.5 rounded-lg
                text-glass-frost/60 hover:text-glass-cyan
                transition-all duration-200 hover:bg-white/5
                group
              "
            >
              <span className="text-xs font-medium tracking-wide group-hover:text-glass-cyan">
                {item.label}
              </span>
            </button>
          ) : (
            <span className="
              px-3 py-1.5 rounded-lg
              text-glass-frost font-semibold
              text-xs tracking-wide
            ">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
