import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function DataTable({
  columns,
  data,
  onRowClick,
  isLoading,
  emptyMessage = 'No hay datos disponibles',
}: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    null
  );

  const handleSort = (columnKey: string) => {
    setSortConfig(current =>
      current?.key === columnKey && current.direction === 'asc'
        ? { key: columnKey, direction: 'desc' }
        : { key: columnKey, direction: 'asc' }
    );
  };

  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (typeof aVal === 'string') {
          return sortConfig.direction === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      })
    : data;

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-xs font-semibold text-glass-frost/70 uppercase tracking-wider bg-white/5 ${
                    column.width || ''
                  }`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 hover:text-glass-cyan transition-colors"
                    >
                      {column.label}
                      {sortConfig?.key === column.key && (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    border-b border-white/5 transition-all duration-200
                    ${onRowClick ? 'cursor-pointer hover:bg-white/5' : ''}
                  `}
                >
                  {columns.map(column => (
                    <td key={column.key} className={`px-6 py-4 text-sm text-glass-frost/80 ${
                      column.width || ''
                    }`}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <p className="text-glass-frost/50 text-sm">{emptyMessage}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
