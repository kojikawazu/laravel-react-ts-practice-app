import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MdDetailPreview from '@/Components/Markdown/MarkdownDetail/molecules/MdDetailPreview';

interface MdDetailPreviewProps {
    postContent: string;
}

describe('MdDetailPreview', () => {
    beforeEach(() => {
    });

    afterEach(() => {
        cleanup();
    });

    const setup = (props: MdDetailPreviewProps) => {
        render(<MdDetailPreview {...props} />);
    };

    it('should render the post content as markdown', () => {
        const testContent = '# Hello World\nThis is a markdown preview.';
        setup({ postContent: testContent });

        const markdownContent = screen.getByText('Hello World');
        expect(markdownContent).toBeInTheDocument();

        const paragraphContent = screen.getByText('This is a markdown preview.');
        expect(paragraphContent).toBeInTheDocument();
    });

    it('should have the correct container styles', () => {
        setup({ postContent: 'Test content' });

        const container = screen.getByTestId('md-detail-preview');
        expect(container).toHaveClass('w-full h-72 bg-white mb-4 p-4 rounded-2xl border-8 border-amber-500');
    });
});
