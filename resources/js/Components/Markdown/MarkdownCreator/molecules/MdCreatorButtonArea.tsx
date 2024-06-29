import { EmojiClickData } from 'emoji-picker-react';
import EmojiButton from '@/Components/Markdown/atoms/emoji/EmojiButton';
import MarkdownButton from '@/Components/Markdown/atoms/button/MarkdownButton';

interface MdCreatorButtonAreaProps {
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
    showEmojiPicker: boolean;
    addEmoji: (emojiData: EmojiClickData) => void;
};

/**
 * [Markdown Creator]ボタンエリアコンポーネント
 * @param setShowEmojiPicker
 * @param showEmojiPicker
 * @param addEmoji
 * @returns JSX
 */
const MdCreatorButtonArea = ({
    setShowEmojiPicker,
    showEmojiPicker,
    addEmoji,
}: MdCreatorButtonAreaProps) => {
    return (
        <div className="flex justify-center">
            <EmojiButton
                setShowEmojiPicker={setShowEmojiPicker}
                showEmojiPicker={showEmojiPicker}
                addEmoji={addEmoji}
            />
            
            <MarkdownButton
                type="submit"
                additionalClassName={"mt-4"}
                label="投稿"
            />
        </div>
    );
}

export default MdCreatorButtonArea;