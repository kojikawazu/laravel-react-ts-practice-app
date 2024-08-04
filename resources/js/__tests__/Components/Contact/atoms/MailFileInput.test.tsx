import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Control, FieldValues } from 'react-hook-form';
import MailFileInput from '@/Components/Contact/atoms/MailFileInput';

vi.mock('react-hook-form', () => ({
    Control: vi.fn(),
}));

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ref?: React.Ref<HTMLInputElement>;
}

vi.mock('@/Components/ui/input', () => {
    const Input = React.forwardRef<HTMLInputElement, InputProps>(
        ({ onChange, ...props }, ref) => {
            return (
                <input
                    onChange={onChange}
                    ref={ref}
                    {...props}
                    data-testid="file-input"
                />
            );
        }
    );
    Input.displayName = 'Input';
    return { Input };
});

const mockOnChange = vi.fn();

interface FormControlProps {
    children: React.ReactNode;
}

interface FormFieldProps {
    render: ({
        field,
    }: {
        field: {
            onChange: (files: FileList | null) => void;
            ref: React.Ref<HTMLInputElement>;
        };
    }) => React.ReactNode;
}

interface FormItemProps {
    children: React.ReactNode;
    className: string;
}

interface FormLabelProps {
    children: React.ReactNode;
}

vi.mock('@/Components/ui/form', () => {
    const FormControl = ({ children }: FormControlProps) => (
        <div data-testid="form-control">{children}</div>
    );
    FormControl.displayName = 'FormControl';

    const FormField = ({ render }: FormFieldProps) =>
        render({ field: { onChange: mockOnChange, ref: vi.fn() } });
    FormField.displayName = 'FormField';

    const FormItem = ({ children, className }: FormItemProps) => (
        <div data-testid="form-item" className={className}>
            {children}
        </div>
    );
    FormItem.displayName = 'FormItem';

    const FormLabel = ({ children }: FormLabelProps) => (
        <label data-testid="form-label">{children}</label>
    );
    FormLabel.displayName = 'FormLabel';

    const FormMessage = () => <div data-testid="form-message"></div>;
    FormMessage.displayName = 'FormMessage';

    return { FormControl, FormField, FormItem, FormLabel, FormMessage };
});

describe('MailFileInput', () => {
    const mockControl = {} as Control<
        {
            username: string;
            subject: string;
            email: string;
            content: string;
            file?: FileList | null;
        },
        FieldValues
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
