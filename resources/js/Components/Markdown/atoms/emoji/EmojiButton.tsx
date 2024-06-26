import { Button } from '@/Components/ui/button';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface EmojiButtonProps {
    setShowEmojiPicker: (value: React.SetStateAction<boolean>) => void;
    showEmojiPicker: boolean;
    addEmoji: (emojiData: EmojiClickData) => void
};

/**
 * 絵文字ボタンコンポーネント
 * @param setShowEmojiPicker
 * @param showEmojiPicker
 * @param addEmoji
 * @returns JSX
 */
const EmojiButton = ({
    setShowEmojiPicker,
    showEmojiPicker,
    addEmoji,
}: EmojiButtonProps) => {
    return (
        <>
            <Button 
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="mt-4 mr-4">
                {showEmojiPicker ? 'Close' : '☻'}
            </Button>
            
            {showEmojiPicker && <EmojiPicker onEmojiClick={addEmoji} />}
        </>
    );
}

export default EmojiButton;