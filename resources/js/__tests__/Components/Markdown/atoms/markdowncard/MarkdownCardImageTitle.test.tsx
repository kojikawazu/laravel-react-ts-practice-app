import { render, screen } from '@testing-library/react';
import MarkdownCardImageTitle from '@/Components/Markdown/atoms/markdowncard/MarkdownCardImageTitle';

vi.mock('@inertiajs/react', () => ({
    Link: vi.fn().mockImplementation(({ href, children, className }) => (
        <a href={href} className={className}>
            {children}
        </a>
    )),
}));

describe('MarkdownCardImageTitle', () => {
    const testImagePath = '/src/image.jpg';
    const testHref = '/markdown/1';

    it('renders the component with correct link', () => {
        render(
            <MarkdownCardImageTitle
                image_path={testImagePath}
                href={testHref}
            />
        );
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', testHref);

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', testImagePath);
    });

    it('renders the image with correct attributes', () => {
        render(<MarkdownCardImageTitle href={testHref} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', '/images/no_image.png');
        expect(image).toHaveAttribute('alt', 'sample');
    });

    it('applies correct classes for styling and hover effect', () => {
        render(<MarkdownCardImageTitle href={testHref} />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass('block h-48 overflow-hidden');

        const image = screen.getByRole('img');
        expect(image).toHaveClass(
            'w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105'
        );
    });

    it('renders with correct dimensions', () => {
        render(<MarkdownCardImageTitle href={testHref} />);
        const link = screen.getByRole('link');
        expect(link).toHaveClass('h-48');
    });
});
