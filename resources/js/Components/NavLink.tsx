import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-amber-400 text-amber-900 focus:border-amber-700 '
                    : 'border-transparent text-amber900 hover:text-amber-700 hover:border-amber-300 focus:text-amber-700 focus:border-amber-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
