import { render, screen, fireEvent } from '@testing-library/react';
import MarkdownButton from '@/Components/Markdown/atoms/button/MarkdownButton';

describe('MarkdownButton', () => {
    it('renders the button with correct label', () => {
        render(<MarkdownButton type="button" label="Click" additionalClassName="" />);
        expect(screen.getByText('Click')).toBeDefined();
    });

    it('applies additional class names', () => {
        render(<MarkdownButton type="button" label="Click" additionalClassName="extra-class" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement.className).toContain('extra-class');
    });

    it('handles click event', () => {
        const onClick = vi.fn();
        render(<MarkdownButton type="button" label="Click" additionalClassName="" onClick={onClick} />);
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('combines default and additional classes', () => {
        render(<MarkdownButton type="button" label="Click" additionalClassName="extra-class" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement.className).toContain('bg-amber-500 text-amber-100 hover:bg-amber-600 focus:ring-amber-500 extra-class');
    });
});
