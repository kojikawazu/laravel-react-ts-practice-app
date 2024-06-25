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
        expect(headingElement).toHaveClass('text-2xl', 'font-bold', 'mb-4', 'text-white', 'border-b-2');
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
        expect(headingElement).toHaveClass('text-2xl', 'font-bold', 'mb-4', 'text-white', 'border-b-2', 'custom-class');
      });
});