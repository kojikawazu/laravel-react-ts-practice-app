import { EmojiClickData } from 'emoji-picker-react';
import EmojiButton from '@/Components/Markdown/atoms/emoji/EmojiButton';
import MarkdownButton from '@/Components/Markdown/atoms/button/MarkdownButton';

interface MdEditorButtonAreaProps {
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
    showEmojiPicker: boolean;
    addEmoji: (emojiData: EmojiClickData) => void;
    handleDelete: () => void;
};

/**
 * [Markdown Editor]ボタンエリアコンポーネント
 * @param setShowEmojiPicker
 * @param showEmojiPicker
 * @param addEmoji
 * @param handleDelete
 * @returns JSX
 */
const MdEditorButtonArea = ({
    setShowEmojiPicker,
    showEmojiPicker,
    addEmoji,
    handleDelete,
}: MdEditorButtonAreaProps) => {
    return (
        <div className="flex justify-center">
            <EmojiButton
                setShowEmojiPicker={setShowEmojiPicker}
                showEmojiPicker={showEmojiPicker}
                addEmoji={addEmoji}
            />
            
            <MarkdownButton
                type="submit"
                label="Update"
                additionalClassName="mt-4 mr-4"
            />

            <MarkdownButton
                type="button"
                label="Delete"
                additionalClassName="mt-4"
                onClick={handleDelete}
            />
        </div>
    )
}

export default MdEditorButtonArea