import { render, screen } from '@testing-library/react';
import MdListInActive from '@/Components/Markdown/MarkdownList/atoms/MdListInActive';

describe('MdListInActive', () => {
    it('renders inactive link with bold text correctly', () => {
        render(<MdListInActive index={0} active={true} label="Page 1" />);

        const spanElement = screen.getByText('Page 1');
        expect(spanElement).toHaveClass('font-bold');
        expect(spanElement).toHaveTextContent('Page 1');
    });

    it('renders inactive link without bold text correctly', () => {
        render(<MdListInActive index={1} active={false} label="Page 2" />);

        const spanElement = screen.getByText('Page 2');
        expect(spanElement).not.toHaveClass('font-bold');
        expect(spanElement).toHaveTextContent('Page 2');
    });

    it('changes label correctly for previous', () => {
        render(
            <MdListInActive index={2} active={false} label="&laquo; Previous" />
        );

        const spanElement = screen.getByText('前へ');
        expect(spanElement).toHaveTextContent('前へ');
    });

    it('changes label correctly for next', () => {
        render(
            <MdListInActive index={3} active={false} label="Next &raquo;" />
        );

        const spanElement = screen.getByText('次へ');
        expect(spanElement).toHaveTextContent('次へ');
    });
});
