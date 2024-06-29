import { render, screen, fireEvent } from '@testing-library/react';
import MdCreatorTitleInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTitleInput';

describe('MdCreatorTitleInput', () => {
    const mockSetData = vi.fn();

    it('renders without crashing', () => {
        render(
        <MdCreatorTitleInput 
            title="Sample title" 
            setData={mockSetData} 
        />
        );
        expect(screen.getByLabelText('タイトル:')).toBeInTheDocument();
    });

    it('displays the provided title', () => {
        render(
        <MdCreatorTitleInput 
            title="Sample title" 
            setData={mockSetData} 
        />
        );
        expect(screen.getByDisplayValue('Sample title')).toBeInTheDocument();
    });

    it('calls setData when title is changed', () => {
        render(
        <MdCreatorTitleInput 
            title="" 
            setData={mockSetData} 
        />
        );

        const input = screen.getByPlaceholderText('タイトルを入力してください。') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New title' } });

        expect(mockSetData).toHaveBeenCalledWith('title', 'New title');
    });
});
