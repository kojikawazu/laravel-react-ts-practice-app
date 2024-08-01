import { render, screen } from '@testing-library/react';
import MarkdownCardTitle from '@/Components/Markdown/atoms/markdowncard/MarkdownCardTitle';

vi.mock('@inertiajs/react', () => ({
    Link: vi.fn().mockImplementation(({ href, children, className }) => (
        <a href={href} className={className}>
            {children}
        </a>
    )),
}));

describe('MarkdownCardTitle', () => {
    const testTitle = 'testTitle';
    const testHref = '/markdown/1';

    it('renders the component with correct link', () => {
        render(<MarkdownCardTitle title={testTitle} href={testHref} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', testHref);
    });

    it('renders the correct title text when title is provided', () => {
        render(<MarkdownCardTitle title={testTitle} href={testHref} />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent(testTitle);
    });

    it('renders the correct title text', () => {
        render(<MarkdownCardTitle href={testHref} />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Untitled Post');
    });

    it('applies correct classes for styling', () => {
        render(<MarkdownCardTitle title={testTitle} href={testHref} />);
        const link = screen.getByRole('link');
        expect(link.className).toContain(
            'text-amber-700 hover:underline block mb-2'
        );

        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading.className).toContain(
            'text-xl font-semibold text-amber-700 hover:text-amber-900 transition-colors duration-300'
        );
    });

    it('renders as an h2 element', () => {
        render(<MarkdownCardTitle title={testTitle} href={testHref} />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading.tagName).toBe('H2');
    });

    it('is wrapped in a Link component', () => {
        render(<MarkdownCardTitle title={testTitle} href={testHref} />);
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link.querySelector('h2')).toBeInTheDocument();
    });
});
