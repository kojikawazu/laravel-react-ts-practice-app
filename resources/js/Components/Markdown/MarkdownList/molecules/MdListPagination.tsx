import MdListInActive from '@/Components/Markdown/MarkdownList/atoms/MdListInActive';
import MdListActive from '@/Components/Markdown/MarkdownList/atoms/MdListActive';

interface MdListPaginationProps {
    links: { url: string | null, label: string, active: boolean }[];
}

/**
 * [MarkdownList]Markdownリストコンポーネントのページネーション
 * @param links
 * @returns JSX
 */
const MdListPagination = ({
    links,
}: MdListPaginationProps) => {
    return (
        <div className="flex justify-center mt-6">
            {links.map((link, index) => (
                link.url === null ? (
                    <MdListInActive
                        index={index}
                        active={link.active}
                        label={link.label}
                    />
                ) : (
                    <MdListActive
                        index={index}
                        url={link.url}
                        label={link.label}
                        active={link.active}
                    />
                )
            ))}
        </div>
    );
}

export default MdListPagination;