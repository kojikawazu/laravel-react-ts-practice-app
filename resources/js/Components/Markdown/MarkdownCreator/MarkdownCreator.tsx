import React, { useEffect, useState } from 'react';
import { commands } from '@uiw/react-md-editor';
import { toast, ToastContainer } from 'react-toastify';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';

import { CommonConstants } from '@/Components/utils/CommonConstants';

import MarkdownTitle from '@/Components/Markdown/atoms/MarkdownTitle';
import MarkdownLinkButton from '@/Components/Markdown/atoms/button/MarkdownLinkButton';
import MarkdownErrorLabel from '@/Components/Markdown/atoms/label/MarkdownErrorLabel';
import MdConfirmDialog from '@/Components/Markdown/atoms/dialog/MdConfirmDialog';

import MdCreatorTitleInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTitleInput';
import MdCreatorImageInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorImageInput';
import MdCreatorPreviewInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorPreviewInput';
import MdCreatorTextareaInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTextareaInput';
import MdCreatorButtonArea from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorButtonArea';

import 'react-toastify/dist/ReactToastify.css';

interface MarkdownCreatorProps {
    message: string;
    error: string;
};

/**
 * Markdown作成コンポーネント
 * @param message Markdown作成メッセージ
 * @param error
 * @returns JSX
 */
const MarkdownCreator = ({
    message,
    error,
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
        title: '',
        content: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (message) {
            toast.success(CommonConstants.TOAST_CREATE_SUCCESS);
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            toast.error(CommonConstants.TOAST_CREATE_FAILURE);
        }
    }, [error]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        handlePost();
        setIsDialogOpen(false);
    };

    return (
        <>
            <ToastContainer />

            <div className="container mx-auto p-4">
                <div className="flex justify-center mb-12">
                    <MarkdownTitle title={CommonConstants.MARKDOWN_CREATOR_TITLE} />
                </div>

                <div className="flex justify-end space-x-4 mb-4">
                    <MarkdownLinkButton
                        label={CommonConstants.BTN_LABEL_LIST}
                        href={CommonConstants.URL_MARKDOWN}
                        additionalClasses="bg-amber-500 text-amber-100 hover:bg-amber-600 focus:ring-amber-500"
                    />
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className="border-2 border-amber-200 p-6 rounded-lg">

                    <MarkdownErrorLabel errorContents={errors.title} />
                    <div className="mb-4">
                        <MdCreatorTitleInput
                            titleLabel={CommonConstants.MARKDOWN_CREATOR_LABEL_TITLE}
                            title={data.title}
                            titlePlaceholder={CommonConstants.MARKDOWN_CREATOR_INPUT_PLACEHOLDER}
                            setData={setData}
                        />
                    </div>

                    <MarkdownErrorLabel errorContents={errors.imageFile} />
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
                    
                    <MarkdownErrorLabel errorContents={errors.content} />
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

                <MdConfirmDialog
                    isOpen={isDialogOpen}
                    onRequestClose={() => setIsDialogOpen(false)}
                    onConfirm={handleConfirm}
                    title={CommonConstants.CREATE_CONFIRM_TITLE}
                    labelYes={CommonConstants.CREATE_CONFIRM_YES}
                    labelNo={CommonConstants.CREATE_CONFIRM_NO}
                    message={CommonConstants.CREATE_CONFIRM_MESSAGE}
                />
            </div>
        </>
    );
}

export default MarkdownCreator;