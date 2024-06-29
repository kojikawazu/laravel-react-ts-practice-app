import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import MdCreatorButtonArea from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorButtonArea';

describe('MdCreatorButtonArea', () => {
    let setShowEmojiPicker: ReturnType<typeof vi.fn>;
    let addEmoji: ReturnType<typeof vi.fn>;
    let showEmojiPicker: boolean;
  
    beforeEach(() => {
      setShowEmojiPicker = vi.fn();
      addEmoji = vi.fn();
      showEmojiPicker = false;
    });
  
    afterEach(() => {
      cleanup();
    });

    it('renders EmojiButton and MarkdownButton', () => {
        render(
            <MdCreatorButtonArea
                setShowEmojiPicker={setShowEmojiPicker}
                showEmojiPicker={showEmojiPicker}
                addEmoji={addEmoji}
            />
        );

        expect(screen.getByRole('button', { name: '投稿' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '☻' })).toBeInTheDocument();
    });

    it('calls setShowEmojiPicker and addEmoji when EmojiButton is clicked', () => {
        render(
            <MdCreatorButtonArea
                setShowEmojiPicker={setShowEmojiPicker}
                showEmojiPicker={showEmojiPicker}
                addEmoji={addEmoji}
            />
        );

        const emojiButton = screen.getByRole('button', { name: '☻' });

        fireEvent.click(emojiButton);
        expect(setShowEmojiPicker).toHaveBeenCalled();
    });

    it('renders MarkdownButton with correct label', () => {
        render(
            <MdCreatorButtonArea
                setShowEmojiPicker={setShowEmojiPicker}
                showEmojiPicker={showEmojiPicker}
                addEmoji={addEmoji}
            />
        );

        const markdownButton = screen.getByRole('button', { name: '投稿' });
        expect(markdownButton).toBeInTheDocument();
        expect(markdownButton).toHaveTextContent('投稿');
    });
});
