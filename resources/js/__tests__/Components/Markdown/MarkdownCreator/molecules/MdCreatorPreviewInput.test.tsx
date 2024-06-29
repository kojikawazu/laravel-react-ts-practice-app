import { render, screen, cleanup } from '@testing-library/react';
import MdCreatorPreviewInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorPreviewInput';


describe('MdCreatorPreviewInput', () => {
    let content: string;

    beforeEach(() => {
        content = '# Sample Markdown Content';
    });

    afterEach(() => {
        cleanup();
    });

    it('renders the preview label correctly', () => {
        render(<MdCreatorPreviewInput content={content} />);

        const label = screen.getByText('プレビュー:');
        expect(label).toBeInTheDocument();
    });

    it('renders the markdown content correctly', () => {
        render(<MdCreatorPreviewInput content={content} />);

        const markdownPreview = screen.getByText('Sample Markdown Content');
        expect(markdownPreview).toBeInTheDocument();
        expect(markdownPreview.tagName).toBe('H1');
    });

    it('renders with the correct classes and styles', () => {
        render(<MdCreatorPreviewInput content={content} />);

        const previewContainer = screen.getByTestId('preview-container');
        expect(previewContainer).toHaveClass('w-full h-72 bg-white mb-4 p-4 rounded-2xl border-8 border-amber-500');
    });
});
