import React from 'react';
import { cn } from '@/lib/utils';

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded bg-zinc-900 border border-zinc-800/40', className)}
      {...props}
    />
  );
}
