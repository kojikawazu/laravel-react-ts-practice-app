import { render, screen } from '@testing-library/react';
import { Control, FieldValues } from 'react-hook-form';
import MailInput from '@/Components/Contact/atoms/MailInput';

vi.mock('react-hook-form', () => ({
    Control: vi.fn(),
    FieldValues: vi.fn(),
    Path: vi.fn(),
}));

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

vi.mock('@/Components/ui/input', () => ({
    Input: ({ placeholder, ...props }: InputProps) => (
        <input placeholder={placeholder} {...props} data-testid="input" />
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
    FormItem: ({ children }: FormItemProps) => (
        <div data-testid="form-item">{children}</div>
    ),
    FormLabel: ({ children }: FormLabelProps) => (
        <label data-testid="form-label">{children}</label>
    ),
    FormMessage: () => <div data-testid="form-message"></div>,
}));

describe('MailInput', () => {
    const mockControl = {} as Control<FieldValues>;

    it('renders the component correctly', () => {
        render(
            <MailInput
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
        expect(screen.getByTestId('input')).toHaveAttribute(
            'placeholder',
            'Test Placeholder'
        );
        expect(screen.getByTestId('form-message')).toBeInTheDocument();
    });

    it('passes the correct props to Input component', () => {
        render(
            <MailInput
                control={mockControl}
                name="testField"
                label="Test Label"
                placeholder="Test Placeholder"
            />
        );

        const input = screen.getByTestId('input');
        expect(input).toHaveAttribute('name', 'test');
        expect(input).toHaveAttribute('placeholder', 'Test Placeholder');
    });
});
