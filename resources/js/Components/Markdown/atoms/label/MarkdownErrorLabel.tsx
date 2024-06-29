interface MarkdownErrorLabelProps {
    errorContents: string | undefined;
};

/**
 * Markdownエラーラベルコンポーネント
 * @param errorContents
 * @returns JSX
 */
const MarkdownErrorLabel = ({
    errorContents,
}: MarkdownErrorLabelProps) => {
  return (
    <>
        {errorContents && <div className="text-red-500 mt-2">{errorContents}</div>}
    </>
  );
}

export default MarkdownErrorLabel;