import { render, screen, fireEvent } from '@testing-library/react';
import MdEditorImageInput from '@/Components/Markdown/MarkdownEditor/molecules/MdEditorImageInput';

describe('MdEditorImageInput', () => {
    const mockHandleImageChange = vi.fn();

    beforeEach(() => {
        mockHandleImageChange.mockClear();
    });

    it('should render the component with the correct initial state', () => {
        render(
            <MdEditorImageInput
                imagePath="test_image.jpg"
                handleImageChange={mockHandleImageChange}
                imagePreview={null}
            />
        );

        expect(screen.getByText('タイトル画像:')).toBeInTheDocument();
        expect(
            screen.getByText('現在の画像はこちらになります。')
        ).toBeInTheDocument();
        expect(screen.getByAltText('Preview')).toBeInTheDocument();
    });

    it('should call handleImageChange when a new file is selected', () => {
        render(
            <MdEditorImageInput
                imagePath="test_image.jpg"
                handleImageChange={mockHandleImageChange}
                imagePreview={null}
            />
        );

        const fileInput = screen.getByLabelText('タイトル画像:');
        const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(mockHandleImageChange).toHaveBeenCalledTimes(1);
        expect(mockHandleImageChange).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should display the image preview when imagePreview is provided', () => {
        render(
            <MdEditorImageInput
                imagePath="test_image.jpg"
                handleImageChange={mockHandleImageChange}
                imagePreview="preview_image.jpg"
            />
        );

        const previewImages = screen.getAllByAltText('Preview');
        expect(previewImages[1]).toBeInTheDocument();
        expect(previewImages[1]).toHaveAttribute('src', 'preview_image.jpg');
    });
});
