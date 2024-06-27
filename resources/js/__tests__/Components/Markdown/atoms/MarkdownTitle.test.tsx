import { render, screen } from '@testing-library/react';
import MarkdownTitle from '@/Components/Markdown/atoms/MarkdownTitle';

describe('MarkdownTitle', () => {
    it('renders the title correctly', () => {
        render(<MarkdownTitle title="Test Title" />);
        const headingElement = screen.getByRole('heading', {level: 1 });
        expect(headingElement).toHaveTextContent('Test Title');
    });

    it('applies default classes', () => {
        render(<MarkdownTitle title="Test Title" />);
        const headingElement = screen.getByRole('heading', {level: 1 });
        expect(headingElement.className).toContain('pb-2 flex items-center text-4xl font-bold text-amber-900 border-b-4 border-amber-600');
    });

    it('applies additional class when provided', () => {
        render(<MarkdownTitle title="Test Title" additiolnalClass="custom-class" />);
        const headingElement = screen.getByRole('heading', {level: 1 });
        expect(headingElement).toHaveClass('custom-class');
    });

    it('renders as an h1 element', () => {
        render(<MarkdownTitle title="Test Title" />);
        const headingElement = screen.getByRole('heading', {level: 1 });
        expect(headingElement.tagName).toBe('H1');
    });

    it('combines default and additional classes', () => {
        render(<MarkdownTitle title="Test Title" additiolnalClass="custom-class" />);
        const headingElement = screen.getByRole('heading', { level: 1 });
        expect(headingElement.className).toContain('pb-2 flex items-center text-4xl font-bold text-amber-900 border-b-4 border-amber-600 custom-class');
      });
});