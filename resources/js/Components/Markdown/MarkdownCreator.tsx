import React, { useState } from 'react';
import MDEditor, { MDEditorProps, commands } from '@uiw/react-md-editor';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Button } from '@/Components/ui/button';

const MarkdownCreator: React.FC = () => {
    const [values, setValues] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const components = {
        h1: ({...props})=><h1 className="text-blue-700">{props.children}</h1>,
    }

    const addEmoji = (emojiData: EmojiClickData) => {
        setValues(values + emojiData.emoji);
        setShowEmojiPicker(false);
    }

    const handleEditorChange: MDEditorProps['onChange'] = (value) => {
        if (value !== undefined) {
            console.log(value);
            setValues(value);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(values);
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Markdown Creator</h1>

            <form onSubmit={handleSubmit}>
                <div 
                    data-color-mode="dark"
                    className="w-full h-72 bg-black mb-4 p-4 rounded-sm"
                >
                    <MDEditor.Markdown
                        source={values}
                    />
                </div>

                <div data-color-mode="dark">
                    <MDEditor 
                        value={values} 
                        onChange={handleEditorChange}
                        height={300}
                        preview="edit"
                        commands={[
                            commands.codeEdit,
                        ]}
                    />
                </div>

                <div className="flex justify-center">
                    <Button 
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="mt-4 mr-4">
                        {showEmojiPicker ? 'Close' : 'Add'}
                    </Button>
                    
                    {showEmojiPicker && <EmojiPicker onEmojiClick={addEmoji} />}
                    
                    <Button type="submit" className="mt-4">Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default MarkdownCreator;