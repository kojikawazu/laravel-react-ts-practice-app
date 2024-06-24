import { Link } from '@inertiajs/react';

interface MarkdownButtonProps {
  label: string;
  href: string;
  additionalClasses: string;
};

/**
 * マークダウンボタンコンポーネント
 * @returns JSX
 */
const MarkdownButton = ({
  label,
  href,
  additionalClasses,
}: MarkdownButtonProps) => {
  return (
    <Link 
        href={href}
        className={`px-4 py-2 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${additionalClasses}`}>
        {label}
    </Link>
  );
}

export default MarkdownButton;