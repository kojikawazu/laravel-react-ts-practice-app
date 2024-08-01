interface MdListInActiveProps {
    index: number;
    active: boolean;
    label: string;
}

/**
 * [MarkdownList]Markdownリストコンポーネントのページネーションの非アクティブリンク
 * @param index
 * @param active
 * @param label
 * @returns JSX
 */
const MdListInActive = ({ index, active, label }: MdListInActiveProps) => {
    const changedActiveBold = active ? 'font-bold' : '';
    const changedLabel =
        label === '« Previous' || label === '&laquo; Previous'
            ? '前へ'
            : label === 'Next »' || label === 'Next &raquo;'
              ? '次へ'
              : label;

    return (
        <span
            key={index}
            className={`mx-1 px-3 py-1 text-amber-500 ${changedActiveBold}`}
        >
            {changedLabel}
        </span>
    );
};

export default MdListInActive;
