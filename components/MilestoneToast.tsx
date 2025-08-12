'use client';
import toast from 'react-hot-toast';

export function pop(msg: string) {
  toast.success(msg, { duration: 3500 });
}

export default function MilestoneToaster() { return <>{/* toaster outlet */}</>; }
