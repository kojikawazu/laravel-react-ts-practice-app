import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Control } from 'react-hook-form';
import MailFileInput from '@/Components/Contact/atoms/MailFileInput';

vi.mock('react-hook-form', () => ({
    Control: vi.fn(),
}));

vi.mock('@/Components/ui/input', () => ({
    Input: React.forwardRef(({ onChange, ...props }: any, ref: any) => (
        <input
            onChange={onChange}
            ref={ref}
            {...props}
            data-testid="file-input"
        />
    )),
}));

const mockOnChange = vi.fn();
vi.mock('@/Components/ui/form', () => ({
    FormControl: ({ children }: any) => (
        <div data-testid="form-control">{children}</div>
    ),
    FormField: ({ render }: any) =>
        render({ field: { onChange: mockOnChange, ref: vi.fn() } }),
    FormItem: ({ children, className }: any) => (
        <div data-testid="form-item" className={className}>
            {children}
        </div>
    ),
    FormLabel: ({ children }: any) => (
        <label data-testid="form-label">{children}</label>
    ),
    FormMessage: () => <div data-testid="form-message"></div>,
}));

describe('MailFileInput', () => {
    const mockControl = {} as Control<
        {
            username: string;
            subject: string;
            email: string;
            content: string;
            file?: FileList | null;
        },
        any
    >;
    const mockFileInputRef = { current: null };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component correctly', () => {
        render(
            <MailFileInput
                control={mockControl}
                fileInputRef={mockFileInputRef}
            />
        );

        expect(screen.getByTestId('form-item')).toBeInTheDocument();
        expect(screen.getByTestId('form-label')).toHaveTextContent('添付画像');
        expect(screen.getByTestId('form-control')).toBeInTheDocument();
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
        expect(screen.getByTestId('form-message')).toBeInTheDocument();
    });

    it('applies the correct attributes to the file input', () => {
        render(
            <MailFileInput
                control={mockControl}
                fileInputRef={mockFileInputRef}
            />
        );

        const input = screen.getByTestId('file-input');
        expect(input).toHaveAttribute('type', 'file');
        expect(input).toHaveAttribute('accept', 'image/*');
        expect(input).toHaveAttribute('placeholder', '画像');
    });

    it('handles file selection correctly', () => {
        render(
            <MailFileInput
                control={mockControl}
                fileInputRef={mockFileInputRef}
            />
        );

        const input = screen.getByTestId('file-input');
        const file = new File(['dummy content'], 'test.png', {
            type: 'image/png',
        });
        fireEvent.change(input, { target: { files: [file] } });

        expect(mockOnChange).toHaveBeenCalledWith(
            expect.arrayContaining([expect.any(File)])
        );
    });

    it('sets the ref correctly', () => {
        render(
            <MailFileInput
                control={mockControl}
                fileInputRef={mockFileInputRef}
            />
        );

        const input = screen.getByTestId('file-input');
        expect(mockFileInputRef.current).toBe(input);
    });

    it('applies the correct CSS class to FormItem', () => {
        render(
            <MailFileInput
                control={mockControl}
                fileInputRef={mockFileInputRef}
            />
        );

        expect(screen.getByTestId('form-item')).toHaveClass('mb-4');
    });
});
