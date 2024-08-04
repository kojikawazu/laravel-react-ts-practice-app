import { render, screen, fireEvent } from '@testing-library/react';
import { ICommand } from '@uiw/react-md-editor';
import MdCreatorTextareaInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTextareaInput';

describe('MdCreatorTextareaInput', () => {
    const mockHandleChange = vi.fn();

    const mockCodeEdit: ICommand = {
        name: 'codeEdit',
        keyCommand: 'codeEdit',
        buttonProps: { 'aria-label': 'Insert code' },
        execute: () => {},
    };

    it('renders without crashing', () => {
        render(
            <MdCreatorTextareaInput
                content="Sample content"
                handleChange={mockHandleChange}
                codeEdit={mockCodeEdit}
            />
        );
        expect(screen.getByText('記載欄:')).toBeInTheDocument();
    });

    it('displays the provided content', () => {
        render(
            <MdCreatorTextareaInput
                content="Sample content"
                handleChange={mockHandleChange}
                codeEdit={mockCodeEdit}
            />
        );
        expect(screen.getByDisplayValue('Sample content')).toBeInTheDocument();
    });

    it('calls handleChange when content is changed', () => {
        render(
            <MdCreatorTextareaInput
                content=""
                handleChange={mockHandleChange}
                codeEdit={mockCodeEdit}
            />
        );

        const editor = screen.getByRole('textbox') as HTMLTextAreaElement;
        fireEvent.change(editor, { target: { value: 'New content' } });

        expect(mockHandleChange).toHaveBeenCalled();
    });
});
