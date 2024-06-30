import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import MdDetailImage from '@/Components/Markdown/MarkdownDetail/molecules/MdDetailImage';

interface MdDetailImageProps {
    image_path?: string | null;
    isImageLoading: boolean;
    setIsImageLoading: (isImageLoading: boolean) => void;
}

describe('MdDetailImage', () => {
    const mockSetIsImageLoading = vi.fn();

    beforeEach(() => {
        mockSetIsImageLoading.mockClear();
    });
    
    afterEach(() => {
        cleanup();
    });
    
    const setup = (props: MdDetailImageProps) => {
        render(<MdDetailImage {...props} />);
    };

    it('should render the loading spinner when isImageLoading is true', () => {
        setup({
            image_path: 'test_image.jpg',
            isImageLoading: true,
            setIsImageLoading: mockSetIsImageLoading,
        });
        const spinner = screen.getByText('', { selector: 'span' });
        expect(spinner).toBeInTheDocument();
    });

    it('should render the image when isImageLoading is false', () => {
        setup({
            image_path: 'test_image.jpg',
            isImageLoading: false,
            setIsImageLoading: mockSetIsImageLoading,
        });
        const image = screen.getByAltText('Preview');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test_image.jpg');
    });

    it('should call setIsImageLoading with false when image is loaded', () => {
        setup({
            image_path: 'test_image.jpg',
            isImageLoading: true,
            setIsImageLoading: mockSetIsImageLoading,
        });
        const image = screen.getByAltText('Preview');
        fireEvent.load(image);
        expect(mockSetIsImageLoading).toHaveBeenCalledWith(false);
    });

    it('should call setIsImageLoading with false when image fails to load', () => {
        setup({
            image_path: 'test_image.jpg',
            isImageLoading: true,
            setIsImageLoading: mockSetIsImageLoading,
        });
        const image = screen.getByAltText('Preview');
        fireEvent.error(image);
        expect(mockSetIsImageLoading).toHaveBeenCalledWith(false);
    });

    it('should not render anything when image_path is undefined or null', () => {
        const { container } = render(
        <MdDetailImage
            image_path={null}
            isImageLoading={true}
            setIsImageLoading={mockSetIsImageLoading}
        />
        );
        expect(container.firstChild).toBeNull();
    });
});
