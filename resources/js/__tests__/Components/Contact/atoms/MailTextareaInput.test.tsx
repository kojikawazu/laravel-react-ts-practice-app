import { render, screen } from '@testing-library/react';
import { Control, FieldValues } from 'react-hook-form';
import MailTextareaInput from '@/Components/Contact/atoms/MailTextareaInput';

vi.mock('react-hook-form', () => ({
    Control: vi.fn(),
    FieldValues: vi.fn(),
    Path: vi.fn(),
}));

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string;
}

vi.mock('@/Components/ui/textarea', () => ({
    Textarea: ({ placeholder, ...props }: TextareaProps) => (
        <textarea placeholder={placeholder} {...props} data-testid="textarea" />
    ),
}));

interface FormControlProps {
    children: React.ReactNode;
}

interface FormFieldProps {
    render: ({ field }: { field: { name: string } }) => React.ReactNode;
}

interface FormItemProps {
    children: React.ReactNode;
    className?: string;
}

interface FormLabelProps {
    children: React.ReactNode;
}

vi.mock('@/Components/ui/form', () => ({
    FormControl: ({ children }: FormControlProps) => (
        <div data-testid="form-control">{children}</div>
    ),
    FormField: ({ render }: FormFieldProps) =>
        render({ field: { name: 'test' } }),
    FormItem: ({ children, className }: FormItemProps) => (
        <div data-testid="form-item" className={className}>
            {children}
        </div>
    ),
    FormLabel: ({ children }: FormLabelProps) => (
        <label data-testid="form-label">{children}</label>
    ),
    FormMessage: () => <div data-testid="form-message"></div>,
}));

describe('MailTextareaInput', () => {
    const mockControl = {} as Control<FieldValues>;

    it('renders the component correctly', () => {
        render(
            <MailTextareaInput
                control={mockControl}
                name="testField"
                label="Test Label"
                placeholder="Test Placeholder"
            />
        );

        expect(screen.getByTestId('form-item')).toBeInTheDocument();
        expect(screen.getByTestId('form-label')).toHaveTextContent(
            'Test Label'
        );
        expect(screen.getByTestId('form-control')).toBeInTheDocument();
        expect(screen.getByTestId('textarea')).toHaveAttribute(
            'placeholder',
            'Test Placeholder'
        );
        expect(screen.getByTestId('form-message')).toBeInTheDocument();
    });

    it('passes the correct props to Textarea component', () => {
        render(
            <MailTextareaInput
                control={mockControl}
                name="testField"
                label="Test Label"
                placeholder="Test Placeholder"
            />
        );

        const textarea = screen.getByTestId('textarea');
        expect(textarea).toHaveAttribute('name', 'test');
        expect(textarea).toHaveAttribute('placeholder', 'Test Placeholder');
    });

    it('applies the correct CSS class to FormItem', () => {
        render(
            <MailTextareaInput
                control={mockControl}
                name="testField"
                label="Test Label"
                placeholder="Test Placeholder"
            />
        );

        expect(screen.getByTestId('form-item')).toHaveClass('mb-4');
    });
});
