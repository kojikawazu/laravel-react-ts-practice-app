interface MarkdownTitleProps {
    title: string;
    additiolnalClass?: string;
};

/**
 * マークダウンタイトルコンポーネント
 * @param title
 * @param additiolnalClass
 * @returns JSX
 */
const MarkdownTitle = ({
    title,
    additiolnalClass,
}: MarkdownTitleProps) => {
  return (
    <h1 className={`text-2xl font-bold mb-4 text-white border-b-2 ${additiolnalClass}`}>
        {title}
    </h1>
  );
}

export default MarkdownTitle;