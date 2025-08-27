import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 justify-between items-start">
        <div className="flex gap-2">
          <div className="mt-1">
            <SidebarTrigger />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        {children && <div className="flex gap-2">{children}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
