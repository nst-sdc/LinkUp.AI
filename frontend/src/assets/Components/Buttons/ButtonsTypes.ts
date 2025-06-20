import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Generic Button Props
 *
 * @template T - Generic type for custom properties
 */
export interface ButtonProps<T>
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    customProps?: T;
}
