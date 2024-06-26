import React, { useEffect } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import EmojiPicker from 'emoji-picker-react';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/Components/ui/button';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';
import MarkdownTitle from './atoms/MarkdownTitle';
import MarkdownButton from './atoms/MarkdownButton';

import 'react-toastify/dist/ReactToastify.css';
import EmojiButton from './atoms/emoji/EmojiButton';
import { aD } from 'vitest/dist/reporters-yx5ZTtEV.js';

/**
 * Markdown作成コンポーネントProps
 */
interface MarkdownCreatorProps {
    message: string,
};

/**
 * Markdown作成コンポーネント
 * @param message Markdown作成メッセージ
 * @returns JSX
 */
const MarkdownCreator = ({
    message,
}: MarkdownCreatorProps) => {
    const {
        data,
        errors,
        addEmoji,
        showEmojiPicker,
        setShowEmojiPicker,
        handleChange,
        handlePost,
    } = useMyMarkdown({
        content: '',
    });

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
    }, [message]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handlePost();
    }

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto p-4 bg-slate-800">
                <div className="flex justify-center mb-4">
                    <MarkdownTitle title={"Markdown Creator"} />
                </div>

                <div className="flex justify-end space-x-4 mb-4">
                    <MarkdownButton
                        label="Back"
                        href="/markdown"
                        additionalClasses="bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500"
                    />
                </div>

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
                            onChange={handleChange}
                            height={300}
                            preview="edit"
                            commands={[
                                commands.codeEdit,
                            ]}
                        />
                    </div>

                    <div className="flex justify-center">
                        <EmojiButton
                            setShowEmojiPicker={setShowEmojiPicker}
                            showEmojiPicker={showEmojiPicker}
                            addEmoji={addEmoji}
                        />
                        
                        <Button type="submit" className="mt-4">Create</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default MarkdownCreator;