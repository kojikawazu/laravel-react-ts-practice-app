import { Link } from '@inertiajs/react';

interface MarkdownCardTitleProps {
    href: string;
};

/**
 * マークダウンカードタイトル
 * @param href
 * @returns JSX
 */
const MarkdownCardTitle = ({
    href,
}: MarkdownCardTitleProps) => {
  return (
    <Link
        href={href}
        className="text-amber-700 hover:underline block mb-2"
    >
        <h2 className="text-xl font-semibold text-amber-700 hover:text-amber-900 transition-colors duration-300">
            {'Untitled Post'}
        </h2>
    </Link>
  );
}

export default MarkdownCardTitle;