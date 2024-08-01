import { Link } from '@inertiajs/react';

interface MdListActiveProps {
    index: number;
    url: string | null;
    label: string;
    active: boolean;
}

/**
 * [MarkdownList]Markdownリストコンポーネントのページネーションのアクティブリンク
 * @param index
 * @param url
 * @param label
 * @param active
 * @returns JSX
 */
const MdListActive = ({ index, url, label, active }: MdListActiveProps) => {
    const activeClassName = active
        ? 'bg-amber-500 text-white'
        : 'bg-white text-amber-500 border border-amber-500';
    const changedLabel =
        label === '« Previous' || label === '&laquo; Previous'
            ? '前へ'
            : label === 'Next »' || label === 'Next &raquo;'
              ? '次へ'
              : label;

    return (
        <Link
            key={index}
            href={url ? url : '#'}
            className={`mx-1 px-3 py-1 rounded ${activeClassName}`}
        >
            {changedLabel}
        </Link>
    );
};

export default MdListActive;
