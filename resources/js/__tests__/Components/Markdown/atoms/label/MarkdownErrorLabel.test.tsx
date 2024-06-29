import { render, screen } from '@testing-library/react';
import MarkdownErrorLabel from '@/Components/Markdown/atoms/label/MarkdownErrorLabel';

describe('MarkdownErrorLabel', () => {
    it('renders error message when errorContents is provided', () => {
        const errorMessage = 'This is an error message';
        render(<MarkdownErrorLabel errorContents={errorMessage} />);

        const errorElement = screen.getByText(errorMessage);
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveClass('text-red-500');
    });

    it('does not render anything when errorContents is undefined', () => {
        render(<MarkdownErrorLabel errorContents={undefined} />);

        const errorElement = screen.queryByText('text-red-500');
        expect(errorElement).toBeNull();
    });
});
