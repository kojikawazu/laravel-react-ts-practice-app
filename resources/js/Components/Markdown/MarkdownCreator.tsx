import React, { useEffect } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import EmojiPicker from 'emoji-picker-react';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/Components/ui/button';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';
import MarkdownTitle from './atoms/MarkdownTitle';
import MarkdownLinkButton from './atoms/button/MarkdownLinkButton';

import 'react-toastify/dist/ReactToastify.css';
import EmojiButton from './atoms/emoji/EmojiButton';
import MarkdownButton from './atoms/button/MarkdownButton';

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
            <div className="container mx-auto p-4">
                <div className="flex justify-center mb-12">
                    <MarkdownTitle title={"Markdown Creator"} />
                </div>

                <div className="flex justify-between space-x-4 mb-2">
                    <div className="flex items-end">
                        <p className="pl-2">Preview:</p>
                    </div>

                    <MarkdownLinkButton
                        label="Back"
                        href="/markdown"
                        additionalClasses="bg-amber-500 text-amber-100 hover:bg-amber-600 focus:ring-amber-500"
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    {errors.content && <div className="text-red-500 mt-2">{errors.content}</div>}

                    <div 
                        data-color-mode="light"
                        className="w-full h-72 bg-white mb-4 p-4 rounded-2xl border-8 border-amber-500">
                        <MDEditor.Markdown
                            source={data.content}
                        />
                    </div>

                    <div className="flex flex-start items-end">
                        <p className="pl-2">Creator:</p>
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
                        
                        <MarkdownButton
                            type="submit"
                            additionalClassName={"mt-4"}
                            label="Create"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default MarkdownCreator;