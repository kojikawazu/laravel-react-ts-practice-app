interface MarkdownTitleProps {
    title: string;
    additiolnalClass?: string;
}

/**
 * マークダウンタイトルコンポーネント
 * @param title
 * @param additiolnalClass
 * @returns JSX
 */
const MarkdownTitle = ({ title, additiolnalClass }: MarkdownTitleProps) => {
    return (
        <h1
            className={`pb-2 flex items-center text-4xl font-bold text-amber-900 border-b-4 border-amber-600 ${additiolnalClass}`}
        >
            {title}
        </h1>
    );
};

export default MarkdownTitle;
