import { render, screen, fireEvent } from '@testing-library/react';
import MarkdownReplyForm from '@/Components/Markdown/molecules/MarkdownReplyForm';

describe('MarkdownReplyForm', () => {
    const handleSubmitMock = vi.fn((e) => e.preventDefault());
    const setContentMock = vi.fn();

    const setup = (
        formClasses = '',
        textareaRows = 2,
        textareaClasses = '',
        content = '',
        submitBtnClasses = '',
        submitBtnInnerClasses = '',
        submitBtnLabel = 'submit'
    ) => {
        return render(
            <MarkdownReplyForm
                formClasses={formClasses}
                handleSubmit={handleSubmitMock}
                textareaRows={textareaRows}
                textareaClasses={textareaClasses}
                content={content}
                setContent={setContentMock}
                submitBtnClasses={submitBtnClasses}
                submitBtnInnerClasses={submitBtnInnerClasses}
                submitBtnLabel={submitBtnLabel}
            />
        );
    };

    test('renders the textarea and submit button', () => {
        setup();

        const textarea = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: /submit/i });

        expect(textarea).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('calls setContent when the textarea value changes', () => {
        setup();

        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: 'Test content' } });

        expect(setContentMock).toHaveBeenCalledWith('content', 'Test content');
    });

    test('calls handleSubmit when the form is submitted', () => {
        setup();

        const button = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(button);

        expect(handleSubmitMock).toHaveBeenCalled();
    });

    test('displays the correct initial content in the textarea', () => {
        setup(
            'Initial form classes',
            2,
            'Initial textarea classes',
            'Initial content',
            'Initial submit button classes',
            'Initial submit inner button classes',
            'Initial submit label classes'
        );

        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveValue('Initial content');
    });
});
