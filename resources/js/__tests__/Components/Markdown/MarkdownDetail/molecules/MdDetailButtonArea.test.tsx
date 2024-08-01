import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import MdDetailButtonArea from '@/Components/Markdown/MarkdownDetail/molecules/MdDetailButtonArea';

describe('MdDetailButtonArea', () => {
    const mockHandleDelete = vi.fn();

    beforeEach(() => {
        render(
            <MdDetailButtonArea
                postId="123"
                loginUserId={1}
                postUserId={1}
                handleDelete={mockHandleDelete}
            />
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('should render the Back button', () => {
        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
        expect(backButton.closest('a')).toHaveAttribute('href', '/markdown');
    });

    it('should render the Update button', () => {
        const updateButton = screen.getByText('Update');
        expect(updateButton).toBeInTheDocument();
        expect(updateButton.closest('a')).toHaveAttribute(
            'href',
            '/markdown/editor/123'
        );
    });

    it('should render the Delete button', () => {
        const deleteButton = screen.getByText('Delete');
        expect(deleteButton).toBeInTheDocument();
    });

    it('should call handleDelete when Delete button is clicked', () => {
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);
        expect(mockHandleDelete).toHaveBeenCalledWith('123');
    });
});

describe('MdDetailButtonArea - other user', () => {
    const mockHandleDelete = vi.fn();

    beforeEach(() => {
        render(
            <MdDetailButtonArea
                postId="123"
                loginUserId={2}
                postUserId={1}
                handleDelete={mockHandleDelete}
            />
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('update button rendering test', () => {
        const updateButton = screen.queryByText('Update');
        expect(updateButton).toBeNull();
    });

    it('delete button rendering test', () => {
        const deleteButton = screen.queryByText('Delete');
        expect(deleteButton).toBeNull();
    });
});
