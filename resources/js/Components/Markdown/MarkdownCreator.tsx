import React, { useEffect, useState } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { toast, ToastContainer } from 'react-toastify';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';
import MarkdownTitle from '@/Components/Markdown/atoms/MarkdownTitle';
import MarkdownLinkButton from '@/Components/Markdown/atoms/button/MarkdownLinkButton';
import EmojiButton from '@/Components/Markdown/atoms/emoji/EmojiButton';
import MarkdownButton from '@/Components/Markdown/atoms/button/MarkdownButton';
import MarkdownErrorLabel from '@/Components/Markdown/atoms/label/MarkdownErrorLabel';

import 'react-toastify/dist/ReactToastify.css';

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
        setData,
        errors,
        addEmoji,
        showEmojiPicker,
        setShowEmojiPicker,
        imagePreview,
        handleChange,
        handleImageChange,
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

                <div className="flex justify-end space-x-4 mb-4">
                    <MarkdownLinkButton
                        label="Back"
                        href="/markdown"
                        additionalClasses="bg-amber-500 text-amber-100 hover:bg-amber-600 focus:ring-amber-500"
                    />
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className="border-2 border-amber-200 p-6 rounded-lg">
                    <MarkdownErrorLabel errorContents={errors.content} />

                    <div className="mb-4">
                        <label className="block text-amber-700 text-sm font-bold mb-2" htmlFor="title">
                            タイトル:
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-amber-700 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-300"
                            placeholder="タイトルを入力してください。"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-amber-700 text-sm font-bold mb-2" htmlFor="imageFile">
                            タイトル画像:
                        </label>
                        <div className="shadow appearance-none border-2 rounded-lg w-full border-amber-200">
                            <input
                                id="imageFile"
                                type="file"
                                onChange={handleImageChange}
                                className="pt-4 pb-2 px-3 text-amber-700 leading-tight focus:outline-none focus:shadow-outline"
                            />

                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="p-4" />
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-amber-700 text-sm font-bold mb-2" htmlFor="preview">
                            プレビュー:
                        </label>

                        <div 
                            data-color-mode="light"
                            className="w-full h-72 bg-white mb-4 p-4 rounded-2xl border-8 border-amber-500">
                            <MDEditor.Markdown
                                source={data.content}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-amber-700 text-sm font-bold mb-2" htmlFor="content">
                            記載欄:
                        </label>

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
                    </div>
                    
                    <div className="mb-4">
                        <div className="flex justify-center">
                            <EmojiButton
                                setShowEmojiPicker={setShowEmojiPicker}
                                showEmojiPicker={showEmojiPicker}
                                addEmoji={addEmoji}
                            />
                            
                            <MarkdownButton
                                type="submit"
                                additionalClassName={"mt-4"}
                                label="投稿"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default MarkdownCreator;