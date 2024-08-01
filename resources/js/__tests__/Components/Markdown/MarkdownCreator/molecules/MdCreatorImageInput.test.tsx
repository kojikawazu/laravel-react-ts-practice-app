import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import MdCreatorImageInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorImageInput';

describe('MdCreatorImageInput', () => {
    let handleImageChange: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        handleImageChange = vi.fn();
    });

    afterEach(() => {
        cleanup();
    });

    it('renders file input and label correctly', () => {
        render(<MdCreatorImageInput handleImageChange={handleImageChange} />);

        expect(screen.getByLabelText('タイトル画像:')).toBeInTheDocument();
        expect(screen.getByLabelText('タイトル画像:')).toHaveAttribute(
            'type',
            'file'
        );
    });

    it('calls handleImageChange when file input changes', () => {
        render(<MdCreatorImageInput handleImageChange={handleImageChange} />);

        const fileInput = screen.getByLabelText(
            'タイトル画像:'
        ) as HTMLInputElement;
        fireEvent.change(fileInput, {
            target: {
                files: [
                    new File(['image'], 'image.png', { type: 'image/png' }),
                ],
            },
        });

        expect(handleImageChange).toHaveBeenCalled();
    });

    it('renders image preview when imagePreview is provided', () => {
        const imagePreview =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';

        render(
            <MdCreatorImageInput
                handleImageChange={handleImageChange}
                imagePreview={imagePreview}
            />
        );

        const img = screen.getByAltText('Preview');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', imagePreview);
    });

    it('does not render image preview when imagePreview is not provided', () => {
        render(
            <MdCreatorImageInput
                handleImageChange={handleImageChange}
                imagePreview={null}
            />
        );

        const img = screen.queryByAltText('Preview');
        expect(img).toBeNull();
    });
});
