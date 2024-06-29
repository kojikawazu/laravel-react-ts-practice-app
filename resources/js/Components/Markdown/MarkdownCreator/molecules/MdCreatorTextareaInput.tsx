import MDEditor, { ContextStore, ICommand } from '@uiw/react-md-editor';

interface MdCreatorTextareaInputProps {
    content:  string;
    handleChange: (value?: string | undefined, event?: React.ChangeEvent<HTMLTextAreaElement> | undefined, state?: ContextStore | undefined) => void;
    codeEdit: ICommand;
};

/**
 * [Markdown Creator]テキストエリアコンポーネント
 * @param content
 * @param handleChange
 * @param codeEdit
 * @returns JSX
 */
const MdCreatorTextareaInput = ({
    content,
    handleChange,
    codeEdit,
}: MdCreatorTextareaInputProps) => {
    return (
        <>
            <label className="block text-amber-700 text-sm font-bold mb-2">
                記載欄:
            </label>

            <div data-color-mode="dark">
                <MDEditor 
                    value={content} 
                    onChange={handleChange}
                    height={300}
                    preview="edit"
                    commands={[
                        codeEdit,
                    ]}
                />
            </div>
        </>
    );
}

export default MdCreatorTextareaInput;