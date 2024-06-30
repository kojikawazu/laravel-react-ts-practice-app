import { render, screen, fireEvent } from '@testing-library/react';
import { EmojiClickData } from 'emoji-picker-react';
import MdEditorButtonArea from '@/Components/Markdown/MarkdownEditor/molecules/MdEditorButtonArea';

vi.mock('@/Components/Markdown/atoms/emoji/EmojiButton', () => {
    return {
        __esModule: true,
        default: ({ setShowEmojiPicker, showEmojiPicker, addEmoji }: { setShowEmojiPicker: (value: React.SetStateAction<boolean>) => void, showEmojiPicker: boolean, addEmoji: (emojiData: EmojiClickData) => void }) => (
            <>
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    {showEmojiPicker ? 'Close' : '☻'}
                </button>
                {showEmojiPicker && <div role="button" onClick={() => addEmoji({ emoji: '😊' } as EmojiClickData)}>😊</div>}
            </>
        )
    };
});

vi.mock('@/Components/Markdown/atoms/button/MarkdownButton', () => {
    return {
        __esModule: true,
        default: ({ type, label, additionalClassName, onClick }: { type: 'button' | 'submit', label: string, additionalClassName: string, onClick?: () => void }) => (
            <button type={type} className={additionalClassName} onClick={onClick}>
                {label}
            </button>
        )
    };
});

describe('MdEditorButtonArea', () => {
    const mockSetShowEmojiPicker = vi.fn();
    const mockAddEmoji = vi.fn();
    const mockHandleDelete = vi.fn();

    it('should render the component with the correct initial state', () => {
        render(
            <MdEditorButtonArea
                setShowEmojiPicker={mockSetShowEmojiPicker}
                showEmojiPicker={false}
                addEmoji={mockAddEmoji}
                handleDelete={mockHandleDelete}
            />
        );

        expect(screen.getByText('Update')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.getByText('☻')).toBeInTheDocument();
    });

    it('should call setShowEmojiPicker when the emoji button is clicked', () => {
        render(
            <MdEditorButtonArea
                setShowEmojiPicker={mockSetShowEmojiPicker}
                showEmojiPicker={false}
                addEmoji={mockAddEmoji}
                handleDelete={mockHandleDelete}
            />
        );

        const emojiButton = screen.getByText('☻');
        fireEvent.click(emojiButton);

        expect(mockSetShowEmojiPicker).toHaveBeenCalledTimes(1);
    });

    it('should call addEmoji when an emoji is clicked', () => {
        render(
            <MdEditorButtonArea
                setShowEmojiPicker={mockSetShowEmojiPicker}
                showEmojiPicker={true}
                addEmoji={mockAddEmoji}
                handleDelete={mockHandleDelete}
            />
        );

        const emojiPicker = screen.getByText('😊');
        fireEvent.click(emojiPicker);

        expect(mockAddEmoji).toHaveBeenCalledTimes(1);
        expect(mockAddEmoji).toHaveBeenCalledWith(expect.objectContaining({ emoji: '😊' }));
    });

    it('should call handleDelete when the delete button is clicked', () => {
        render(
            <MdEditorButtonArea
                setShowEmojiPicker={mockSetShowEmojiPicker}
                showEmojiPicker={false}
                addEmoji={mockAddEmoji}
                handleDelete={mockHandleDelete}
            />
        );

        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        expect(mockHandleDelete).toHaveBeenCalledTimes(1);
    });
});
