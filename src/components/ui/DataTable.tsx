import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataTableProps {
  title: string;
  description: string;
  data: any[];
  columns: {
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
  }[];
  exportData?: {
    filename: string;
    headers: string[];
    getRowData: (item: any) => string[];
  };
  loading?: boolean;
  emptyState?: {
    icon?: React.ReactNode;
    title: string;
    description: string;
  };
  refetch?: () => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
  };
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  description,
  data,
  columns,
  exportData,
  loading = false,
  emptyState,
  refetch,
  pagination,
}) => {
  const { toast } = useToast();

  const exportToCSV = () => {
    if (!exportData) return;

    // Helper function to properly escape CSV values
    const escapeCSVValue = (value: string) => {
      // Convert to string and escape quotes
      const stringValue = String(value).replace(/"/g, '""');
      // Wrap in quotes if it contains comma, newline, or quote
      if (
        stringValue.includes(',') ||
        stringValue.includes('\n') ||
        stringValue.includes('"')
      ) {
        return `"${stringValue}"`;
      }
      return stringValue;
    };

    const csvContent = [
      exportData.headers.map(escapeCSVValue),
      ...data.map((item) => exportData.getRowData(item).map(escapeCSVValue)),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportData.filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export Complete',
      description: 'Data has been exported to CSV.',
    });
  };

  if (loading) {
    return (
      <Card className="card-premium">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-premium overflow-x-auto  ">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {pagination ? (
              <>
                Showing{' '}
                {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}{' '}
                of {pagination.totalItems} items
              </>
            ) : (
              `${data.length} item${data.length !== 1 ? 's' : ''} found`
            )}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {refetch && (
            <Button
              onClick={refetch}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
          )}
          {exportData && (
            <Button
              onClick={exportToCSV}
              variant="outline"
              disabled={data.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-12">
            {emptyState?.icon || (
              <div className="text-muted-foreground mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-muted-foreground/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            )}
            <h3 className="text-lg font-semibold mb-2">
              {emptyState?.title || 'No data found'}
            </h3>
            <p className="text-muted-foreground">
              {emptyState?.description ||
                'Data will appear here once available.'}
            </p>
          </div>
        ) : (
          <div className="">
            <table className="w-full ">
              <thead>
                <tr className="border-b border-border">
                  {columns.map((column) => (
                    <th key={column.key} className="text-left py-3 px-2">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-b border-border/50"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="py-3 px-2">
                        {column.render
                          ? column.render(item)
                          : item[column.key] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {pagination && (
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Items per page:
              </span>
              {pagination.onItemsPerPageChange && (
                <Select
                  value={pagination.itemsPerPage.toString()}
                  onValueChange={(value) =>
                    pagination.onItemsPerPageChange?.(parseInt(value))
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage - 1)
                }
                disabled={pagination.currentPage <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    let pageNumber;
                    if (pagination.totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (
                      pagination.currentPage >=
                      pagination.totalPages - 2
                    ) {
                      pageNumber = pagination.totalPages - 4 + i;
                    } else {
                      pageNumber = pagination.currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant={
                          pagination.currentPage === pageNumber
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => pagination.onPageChange(pageNumber)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  }
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage + 1)
                }
                disabled={pagination.currentPage >= pagination.totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
