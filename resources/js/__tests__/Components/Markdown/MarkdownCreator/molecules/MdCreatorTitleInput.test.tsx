import { render, screen, fireEvent } from '@testing-library/react';
import MdCreatorTitleInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTitleInput';

describe('MdCreatorTitleInput', () => {
    const mockSetData = vi.fn();

    it('renders without crashing', () => {
        render(
        <MdCreatorTitleInput 
            titleLabel="Sample Label"
            title="Sample title" 
            titlePlaceholder="Sample placeholder"
            setData={mockSetData} 
        />
        );
        expect(screen.getByLabelText('Sample Label')).toBeInTheDocument();
    });

    it('displays the provided title', () => {
        render(
        <MdCreatorTitleInput 
            titleLabel="Sample Label"
            title="Sample title" 
            titlePlaceholder="Sample placeholder"
            setData={mockSetData} 
        />
        );
        expect(screen.getByDisplayValue('Sample title')).toBeInTheDocument();
    });

    it('displays the provided placeholder', () => {
        render(
        <MdCreatorTitleInput 
            titleLabel="Sample Label"
            title="Sample title" 
            titlePlaceholder="Sample placeholder"
            setData={mockSetData} 
        />
        );
        expect(screen.getByPlaceholderText('Sample placeholder')).toBeInTheDocument();
    });

    it('calls setData when title is changed', () => {
        render(
        <MdCreatorTitleInput
            titleLabel="Sample Label"
            title=""
            titlePlaceholder="Sample placeholder"
            setData={mockSetData} 
        />
        );

        const input = screen.getByPlaceholderText('Sample placeholder') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New title' } });

        expect(mockSetData).toHaveBeenCalledWith('title', 'New title');
    });
});
