import React, { useEffect, useState } from 'react';
import MDEditor, { MDEditorProps, commands } from '@uiw/react-md-editor';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from '@inertiajs/inertia-react';
import { Button } from '@/Components/ui/button';

import 'react-toastify/dist/ReactToastify.css';

const MarkdownCreator = ({
    message,
}: {
    message: string,
}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message]);

    const addEmoji = (emojiData: EmojiClickData) => {
        setData('content', data.content + emojiData.emoji);
        setShowEmojiPicker(false);
    }

    const handleEditorChange: MDEditorProps['onChange'] = (value) => {
        if (value !== undefined) {
            setData('content', value);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/markdown/posts', {
            onSuccess: () => {
                reset();
                setShowEmojiPicker(false);
            },
            onError: () => {
                toast.error('An error occurred while submitting the post');
            }
        });
    }

    return (
        <>
            <ToastContainer />
                <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-4">Markdown Creator</h1>

                <form onSubmit={handleSubmit}>
                    {errors.content && <div className="text-red-500 mt-2">{errors.content}</div>}

                    <div 
                        data-color-mode="dark"
                        className="w-full h-72 bg-black mb-4 p-4 rounded-sm"
                    >
                        <MDEditor.Markdown
                            source={data.content}
                        />
                    </div>

                    <div data-color-mode="dark">
                        <MDEditor 
                            value={data.content} 
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
        </>
    );
}

export default MarkdownCreator;