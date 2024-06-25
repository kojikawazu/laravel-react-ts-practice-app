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
        className="text-white mb-2 hover:underline"
    >
        {label}
    </Link>
  );
}

export default MarkdownCreateLink;