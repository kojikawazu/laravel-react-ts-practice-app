import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-amber-400 text-amber-700 bg-amber-50 focus:text-amber-800 focus:bg-amber-100 focus:border-amber-700'
                    : 'border-transparent text-amber-700 hover:text-amber-800 hover:bg-amber-50 hover:border-amber-300 focus:text-amber-800 focus:bg-amber-50 focus:border-amber-300'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
