import React, { useEffect } from 'react';
import { commands } from '@uiw/react-md-editor';
import { toast, ToastContainer } from 'react-toastify';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';
import MarkdownTitle from '@/Components/Markdown/atoms/MarkdownTitle';
import MarkdownLinkButton from '@/Components/Markdown/atoms/button/MarkdownLinkButton';
import MarkdownErrorLabel from '@/Components/Markdown/atoms/label/MarkdownErrorLabel';
import MdCreatorTitleInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTitleInput';
import MdCreatorImageInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorImageInput';
import MdCreatorPreviewInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorPreviewInput';
import MdCreatorTextareaInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTextareaInput';
import MdCreatorButtonArea from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorButtonArea';

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
                        <MdCreatorTitleInput
                            title={data.title}
                            setData={setData}
                        />
                    </div>

                    <div className="mb-4">
                        <MdCreatorImageInput
                            handleImageChange={handleImageChange}
                            imagePreview={imagePreview}
                        />
                    </div>

                    <div className="mb-4">
                        <MdCreatorPreviewInput
                            content={data.content}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <MdCreatorTextareaInput
                            content={data.content}
                            handleChange={handleChange}
                            codeEdit={commands.codeEdit}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <MdCreatorButtonArea
                            setShowEmojiPicker={setShowEmojiPicker}
                            showEmojiPicker={showEmojiPicker}
                            addEmoji={addEmoji}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default MarkdownCreator;