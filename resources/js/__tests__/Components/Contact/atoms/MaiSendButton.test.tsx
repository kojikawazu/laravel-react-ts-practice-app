import React from 'react';
import { render, screen } from '@testing-library/react';
import MailSendButton from '@/Components/Contact/atoms/MailSendButton';

vi.mock('react-spinners', () => ({
    ClipLoader: () => <div data-testid="clip-loader">Loading...</div>,
}));
vi.mock('@/Components/ui/button', () => ({
    Button: ({ children, ...props }: React.PropsWithChildren<any>) => (
        <button {...props}>{children}</button>
    ),
}));

describe('MailSendButton', () => {
    it('renders the button with "送信" text when not submitting', () => {
        render(<MailSendButton isSubmitting={false} />);
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('送信');
        expect(button).not.toBeDisabled();
    });

    it('renders the button with ClipLoader when submitting', () => {
        render(<MailSendButton isSubmitting={true} />);
        const button = screen.getByRole('button');
        const loader = screen.getByTestId('clip-loader');
        expect(button).toContainElement(loader);
        expect(button).toBeDisabled();
    });

    it('applies the correct CSS classes', () => {
        render(<MailSendButton isSubmitting={false} />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('mb-4 bg-amber-600');
    });

    it('disables the button when submitting', () => {
        render(<MailSendButton isSubmitting={true} />);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
});
