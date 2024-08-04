import { render, screen, fireEvent } from '@testing-library/react';
import EmojiButton from '@/Components/Markdown/atoms/emoji/EmojiButton';
import { EmojiClickData } from 'emoji-picker-react';

const mockEmojiClickData = {
    emoji: '😀',
    unified: '1F600',
};

vi.mock('emoji-picker-react', () => {
    return {
        __esModule: true,
        default: ({
            onEmojiClick,
        }: {
            onEmojiClick: (emoji: EmojiClickData) => void;
        }) => (
            <div
                data-testid="emoji-picker"
                onClick={() =>
                    onEmojiClick(mockEmojiClickData as EmojiClickData)
                }
            >
                EmojiPicker
            </div>
        ),
    };
});

describe('EmojiButton', () => {
    const setShowEmojiPickerMock = vi.fn();
    const addEmojiMock = vi.fn();

    const setup = (showEmojiPicker = false) => {
        return render(
            <EmojiButton
                setShowEmojiPicker={setShowEmojiPickerMock}
                showEmojiPicker={showEmojiPicker}
                addEmoji={addEmojiMock}
            />
        );
    };

    it('renders the button with correct text based on showEmojiPicker prop', () => {
        setup();

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('☻');
    });

    it('toggles the emoji picker when the button is clicked', () => {
        setup();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(setShowEmojiPickerMock).toHaveBeenCalledWith(true);
    });

    it('renders the emoji picker when showEmojiPicker is true', () => {
        setup(true);

        const emojiPicker = screen.getByTestId('emoji-picker');
        expect(emojiPicker).toBeInTheDocument();
    });

    it('calls addEmoji when an emoji is clicked', () => {
        setup(true);

        const emojiPicker = screen.getByTestId('emoji-picker');
        fireEvent.click(emojiPicker);

        expect(addEmojiMock).toHaveBeenCalled();
        expect(addEmojiMock).toHaveBeenCalledWith(
            expect.objectContaining({
                emoji: '😀',
                unified: '1F600',
            })
        );
    });
});
