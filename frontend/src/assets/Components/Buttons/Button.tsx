import { ButtonProps } from '@/assets/Components/Buttons/ButtonsTypes';
import '@css/button.scss';

/**
 * Button Component
 *
 * @description A simple button component that can be used to trigger actions.
 *
 * @params children - The content to be displayed inside the button.
 * @params className - Additional CSS classes to apply to the button.
 */
export function Button<T>({
    children,
    className = '.button',
    type = 'button',
}: ButtonProps<T>) {
    return (
        <button type={type} className={className}>
            {children}
        </button>
    );
}
