import MDEditor from '@uiw/react-md-editor';

interface MdCreatorPreviewInputProps {
    content: string;

};

/**
 * [Markdown Creator]プレビューコンポーネント
 * @param content
 * @returns JSX
 */
const MdCreatorPreviewInput = ({
    content,
}: MdCreatorPreviewInputProps) => {
    return (
        <>
            <label className="block text-amber-700 text-sm font-bold mb-2" htmlFor="preview">
                プレビュー:
            </label>

            <div 
                id="preview-container"
                data-color-mode="light"
                className="w-full h-72 bg-white mb-4 p-4 rounded-2xl border-8 border-amber-500"
                aria-labelledby="preview"
                data-testid="preview-container"
            >
                <MDEditor.Markdown
                    source={content}
                />
            </div>
        </>
    );
}

export default MdCreatorPreviewInput;