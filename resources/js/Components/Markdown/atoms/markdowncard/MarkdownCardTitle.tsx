import { Link } from '@inertiajs/react';

interface MarkdownCardTitleProps {
    title?: string | null;
    href: string;
};

/**
 * マークダウンカードタイトル
 * @param href
 * @returns JSX
 */
const MarkdownCardTitle = ({
    title,
    href,
}: MarkdownCardTitleProps) => {
  return (
    <Link
        href={href}
        className="text-amber-700 hover:underline block mb-2"
    >
        <h2 className="text-xl font-semibold text-amber-700 hover:text-amber-900 transition-colors duration-300">
            {title ? title : 'Untitled Post'}
        </h2>
    </Link>
  );
}

export default MarkdownCardTitle;