import { Link } from '@inertiajs/react';

interface MarkdownCreateLinkProps {
    href: string;
    label: string;
};

/**
 * Markdown作成リンクコンポーネント
 * @param href
 * @param label
 * @returns JSX
 */
const MarkdownCreateLink = ({
    href,
    label,
}: MarkdownCreateLinkProps) => {
  return (
    <Link
        href={href}
        className="text-md text-amber-900 border-b-2 border-amber-600 flex items-center hover:text-amber-400 hover:border-amber-300"
    >
        {label}
    </Link>
  );
}

export default MarkdownCreateLink;