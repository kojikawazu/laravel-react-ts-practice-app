import { Link } from '@inertiajs/react';

interface MarkdownCardImageTitleProps {
    image_path?: string;
    href: string;
}

/**
 * Markdown画像タイトルコンポーネント
 * @param post
 * @returns JSX
 */
const MarkdownCardImageTitle = ({
    image_path,
    href,
}: MarkdownCardImageTitleProps) => {
    return (
        <Link href={href} className="block h-48 overflow-hidden">
            <img
                src={image_path ? image_path : `/images/no_image.png`}
                alt={`sample`}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
        </Link>
    );
};

export default MarkdownCardImageTitle;
