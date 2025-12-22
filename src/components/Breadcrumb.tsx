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
    <div className="flex items-center gap-2 mb-6 text-sm">
      <button
        onClick={() => navigate('/app/admin')}
        className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
        title="Dashboard"
      >
        <Home className="w-4 h-4" />
      </button>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-slate-600" />
          {item.path ? (
            <button
              onClick={() => navigate(item.path!)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-300 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
