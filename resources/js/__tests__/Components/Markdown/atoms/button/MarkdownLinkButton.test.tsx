import { render, screen } from '@testing-library/react';
import MarkdownLinkButton from '@/Components/Markdown/atoms/button/MarkdownLinkButton';

vi.mock('@inertiajs/react', () => ({
    Link: vi.fn().mockImplementation(({ href, className, children }) => (
        <a href={href} className={className}>
            {children}
        </a>
    )),
}));

describe('MarkdownButton', () => {
    it('renders the button with correct label', () => {
        render(
            <MarkdownLinkButton
                label="Click"
                href="/test"
                additionalClasses=""
            />
        );
        expect(screen.getByText('Click')).toBeDefined();
    });

    it('renders as a link with correct href', () => {
        render(
            <MarkdownLinkButton
                label="Click"
                href="/test"
                additionalClasses=""
            />
        );
        const linkElement = screen.getByRole('link');
        expect(linkElement.getAttribute('href')).toBe('/test');
    });

    it('applies default classes', () => {
        render(
            <MarkdownLinkButton
                label="Click"
                href="/test"
                additionalClasses=""
            />
        );
        const linkElement = screen.getByRole('link');
        expect(linkElement.className).toContain(
            'px-4 py-2 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50'
        );
    });

    it('applies additional classes when provided', () => {
        render(
            <MarkdownLinkButton
                label="Click"
                href="/test"
                additionalClasses="bg-blue-500 text-white"
            />
        );
        const linkElement = screen.getByRole('link');
        expect(linkElement.className).toContain('bg-blue-500 text-white');
    });

    it('combines default and additional classes', () => {
        render(
            <MarkdownLinkButton
                label="Click"
                href="/test"
                additionalClasses="bg-blue-500 text-white"
            />
        );
        const linkElement = screen.getByRole('link');
        expect(linkElement.className).toContain(
            'px-4 py-2 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-blue-500 text-white'
        );
    });
});
