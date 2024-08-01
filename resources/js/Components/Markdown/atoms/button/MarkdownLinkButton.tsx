import { Link } from '@inertiajs/react';

interface MarkdownLinkButtonProps {
    label: string;
    href: string;
    additionalClasses: string;
}

/**
 * マークダウンリンクボタンコンポーネント
 * @param label
 * @param href
 * @param additionalClasses
 * @returns JSX
 */
const MarkdownLinkButton = ({
    label,
    href,
    additionalClasses,
}: MarkdownLinkButtonProps) => {
    return (
        <Link
            href={href}
            className={`px-4 py-2 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${additionalClasses}`}
        >
            {label}
        </Link>
    );
};

export default MarkdownLinkButton;
