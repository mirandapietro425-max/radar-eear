import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement } from 'react';

export type ToastProps = HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: (open: boolean) => void };
export type ToastActionElement = ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;

export function Toast({ className = '', ...props }: ToastProps) {
  return <div role="status" className={`rounded-xl border bg-[hsl(var(--card))] p-4 shadow-lg ${className}`} {...props} />;
}
export function ToastTitle({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`font-semibold ${className}`} {...props} />; }
export function ToastDescription({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={`text-sm text-[hsl(var(--muted-foreground))] ${className}`} {...props} />; }
export function ToastClose(props: ButtonHTMLAttributes<HTMLButtonElement>) { return <button type="button" {...props} />; }
export function ToastViewport({ className = '', ...props }: HTMLAttributes<HTMLOListElement>) { return <ol className={`fixed right-4 top-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2 ${className}`} {...props} />; }
