import { FormEvent } from "react";

interface MarkdownReplyForm {
    formClasses: string;
    handleSubmit:  (e: FormEvent) => void;
    textareaRows: number;
    textareaClasses: string;
    content: string;
    setContent: (key: string, value: string) => void;
    submitBtnClasses: string;
    submitBtnInnerClasses: string;
    submitBtnLabel: string;
};

/**
 * Markdown返信フォームコンポーネント
 * @param content
 * @param setContent
 * @returns JSX
 */
const MarkdownReplyForm = ({
    formClasses,
    handleSubmit,
    textareaRows,
    textareaClasses,
    content,
    setContent,
    submitBtnClasses,
    submitBtnInnerClasses,
    submitBtnLabel,
}: MarkdownReplyForm) => {
  return (
    <form 
        onSubmit={handleSubmit} 
        className={formClasses}
    >
        <textarea
            className={textareaClasses}
            rows={textareaRows}
            value={content}
            onChange={(e) => setContent('content', e.target.value)}
        />

        <div className={submitBtnClasses}>
            <button
                type="submit"
                className={submitBtnInnerClasses}>
                {submitBtnLabel}
            </button>
        </div>
    </form>
  );
}

export default MarkdownReplyForm;