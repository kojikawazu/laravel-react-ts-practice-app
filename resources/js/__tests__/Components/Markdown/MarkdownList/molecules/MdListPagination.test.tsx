import { render, screen } from '@testing-library/react';
import MdListPagination from '@/Components/Markdown/MarkdownList/molecules/MdListPagination';

describe('MdListPagination', () => {
    const links = [
        { url: null, label: '&laquo; Previous', active: false },
        { url: '/page/1', label: '1', active: true },
        { url: '/page/2', label: '2', active: false },
        { url: null, label: 'Next &raquo;', active: false }
    ];

    it('renders pagination links correctly', () => {
        render(<MdListPagination links={links} />);

        // Check for inactive links
        expect(screen.getByText('前へ')).toBeInTheDocument();
        expect(screen.getByText('次へ')).toBeInTheDocument();

        // Check for active and inactive links
        expect(screen.getByText('1')).toHaveClass('bg-amber-500 text-white');
        expect(screen.getByText('2')).toHaveClass('bg-white text-amber-500 border border-amber-500');
    });

    it('renders MdListInActive and MdListActive components correctly', () => {
        render(<MdListPagination links={links} />);

        // Check for inactive components
        expect(screen.getByText('前へ')).toBeInTheDocument();
        expect(screen.getByText('次へ')).toBeInTheDocument();

        // Check for active components
        expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument();
    });
});
