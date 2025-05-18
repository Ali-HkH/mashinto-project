'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';

const DynamicCarMap = dynamic(() => import('@/components/cars/CarMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />
});

export default DynamicCarMap;