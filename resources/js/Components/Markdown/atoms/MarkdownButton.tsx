import { Link } from '@inertiajs/react';

interface MarkdownButtonProps {
  label: string;
  href: string;
  backgroundColor: string;
  textColor: string;
};

/**
 * マークダウンボタンコンポーネント
 * @returns JSX
 */
const MarkdownButton = ({
  label,
  href,
  backgroundColor,
  textColor
}: MarkdownButtonProps) => {
  return (
    <Link 
        href={href}
        className={`bg-${backgroundColor}-500 text-${textColor} px-4 py-2 rounded-md shadow-md hover:bg-${backgroundColor}-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-${backgroundColor}-500 focus:ring-opacity-50`}>
        {label}
    </Link>
  );
}

export default MarkdownButton;