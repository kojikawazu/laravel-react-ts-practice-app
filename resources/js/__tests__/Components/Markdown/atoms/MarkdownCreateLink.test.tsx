import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MarkdownCreateLink from '@/Components/Markdown/atoms/MarkdownCreateLink';

vi.mock('@inertiajs/react', () => ({
    Link: vi.fn().mockImplementation(({ href, className, children }) => (
        <a href={href} className={className}>
            {children}
        </a>
    )),
}));

describe('MarkdownCreateLink', () => {
    it('renders the link with correct label', () => {
        render(<MarkdownCreateLink href="/create" label="Create New" />);
        expect(screen.getByText('Create New')).toBeDefined();
    });

    it('renders as a link with correct href', () => {
        render(<MarkdownCreateLink href="/create" label="Create New" />);
        const linkElement = screen.getByRole('link');
        expect(linkElement.getAttribute('href')).toBe('/create');
    });

    it('applies correct default classes', () => {
        render(<MarkdownCreateLink href="/create" label="Create New" />);
        const linkElement = screen.getByRole('link');
        expect(linkElement.className).toContain(
            'flex items-center text-md text-amber-900 border-b-2 border-amber-600 hover:text-amber-400 hover:border-amber-300'
        );
    });

    it('renders as an anchor tag', () => {
        render(<MarkdownCreateLink href="/create" label="Create New" />);
        const linkElement = screen.getByRole('link');
        expect(linkElement.tagName).toBe('A');
    });

    it('has correct accessibility role', () => {
        render(<MarkdownCreateLink href="/create" label="Create New" />);
        expect(screen.getByRole('link')).toBeDefined();
    });
});
