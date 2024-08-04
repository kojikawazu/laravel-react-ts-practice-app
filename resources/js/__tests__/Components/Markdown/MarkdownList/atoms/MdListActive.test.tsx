import { render, screen } from '@testing-library/react';
import MdListActive from '@/Components/Markdown/MarkdownList/atoms/MdListActive';

interface LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

vi.mock('@inertiajs/react', () => ({
    Link: ({ children, href, className }: LinkProps) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

describe('MdListActive', () => {
    it('renders active link correctly', () => {
        render(
            <MdListActive
                index={0}
                url="/test-url"
                label="Page 1"
                active={true}
            />
        );

        const linkElement = screen.getByRole('link', { name: /Page 1/i });
        expect(linkElement).toHaveAttribute('href', '/test-url');
        expect(linkElement).toHaveClass('bg-amber-500 text-white');
    });

    it('renders inactive link correctly', () => {
        render(
            <MdListActive
                index={1}
                url="/test-url-2"
                label="Page 2"
                active={false}
            />
        );

        const linkElement = screen.getByRole('link', { name: /Page 2/i });
        expect(linkElement).toHaveAttribute('href', '/test-url-2');
        expect(linkElement).toHaveClass(
            'bg-white text-amber-500 border border-amber-500'
        );
    });

    it('changes label correctly', () => {
        render(
            <MdListActive
                index={2}
                url="/test-url-3"
                label="&laquo; Previous"
                active={false}
            />
        );

        const linkElement = screen.getByRole('link', { name: /前へ/i });
        expect(linkElement).toHaveTextContent('前へ');
    });

    it('renders without url', () => {
        render(
            <MdListActive
                index={3}
                url={null}
                label="Next &raquo;"
                active={false}
            />
        );

        const linkElement = screen.getByRole('link', { name: /次へ/i });
        expect(linkElement).toHaveAttribute('href', '#');
        expect(linkElement).toHaveClass(
            'bg-white text-amber-500 border border-amber-500'
        );
    });
});
