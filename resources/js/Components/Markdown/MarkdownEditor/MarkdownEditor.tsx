import React, { useEffect, useState } from 'react';
import { commands } from '@uiw/react-md-editor';
import { toast, ToastContainer } from 'react-toastify';
import { MarkdownPost } from '@/types/types';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';
import useModalDialog from '@/hooks/useModalDialog';

import { CommonConstants } from '@/Components/utils/CommonConstants';

import MarkdownTitle from '@/Components/Markdown/atoms/MarkdownTitle';
import MarkdownLinkButton from '@/Components/Markdown/atoms/button/MarkdownLinkButton';
import MarkdownErrorLabel from '@/Components/Markdown/atoms/label/MarkdownErrorLabel';
import MdConfirmDialog from '@/Components/Markdown/atoms/dialog/MdConfirmDialog';

import MdCreatorTitleInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTitleInput';
import MdCreatorPreviewInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorPreviewInput';
import MdCreatorTextareaInput from '@/Components/Markdown/MarkdownCreator/molecules/MdCreatorTextareaInput';

import MdEditorButtonArea from '@/Components/Markdown/MarkdownEditor/molecules/MdEditorButtonArea';
import MdEditorImageInput from '@/Components/Markdown/MarkdownEditor/molecules/MdEditorImageInput';


/**
 * MarkdownエディタコンポーネントProps
 */
interface MarkdownEditorProps {
  post: MarkdownPost;
  message: string;
  error: string;
};

/**
 * Markdownエディタコンポーネント
 * @param Post
 * @param message
 * @returns JSX
 */
const MarkdownEditor = ({
  post,
  message,
  error,
}: MarkdownEditorProps) => {
  const {
    data,
    setData,
    errors,
    addEmoji,
    showEmojiPicker,
    setShowEmojiPicker,
    imagePreview,
    handleChange,
    handlePut,
    handleDestroy,
    handleImageChange,
  } = useMyMarkdown({
      title: post.title!,
      content: post.content,
  });

  const updateDialog = useModalDialog();
  const deleteDialog = useModalDialog();

  useEffect(() => {
    if (message) {
      toast.success(CommonConstants.TOAST_UPDATE_SUCCESS);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
        toast.success(CommonConstants.TOAST_CREATE_FAILURE);
    }
}, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDialog.openDialog();
  };

  return (
    <>
      <ToastContainer />

      <div className="container mx-auto p-4">
          <div className="flex justify-center mb-12">
              <MarkdownTitle title={CommonConstants.MARKDOWN_EDITOR_TITLE} />
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
                      title={data.title}
                      setData={setData}
                  />
              </div>

              <MarkdownErrorLabel errorContents={errors.imageFile} />
              <div className="mb-4">
                <MdEditorImageInput
                  imagePath={post.image_path!}
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
                  <MdEditorButtonArea
                      setShowEmojiPicker={setShowEmojiPicker}
                      showEmojiPicker={showEmojiPicker}
                      addEmoji={addEmoji}
                      handleDelete={() => deleteDialog.openDialog()}
                  />
              </div>
          </form>

          <MdConfirmDialog
              isOpen={updateDialog.isDialogOpen}
              onRequestClose={() => updateDialog.closeDialog()}
              onConfirm={() => updateDialog.closeDialog(() => handlePut(post.id))}
              title={CommonConstants.UPDATE_CONFIRM_TITLE}
              labelYes={CommonConstants.UPDATE_CONFIRM_YES}
              labelNo={CommonConstants.UPDATE_CONFIRM_NO}
              message={CommonConstants.UPDATE_CONFIRM_MESSAGE}
          /> 

          <MdConfirmDialog
              isOpen={deleteDialog.isDialogOpen}
              onRequestClose={() => deleteDialog.closeDialog()}
              onConfirm={() => deleteDialog.closeDialog(() => handleDestroy(post.id))}
              title={CommonConstants.DELETE_CONFIRM_TITLE}
              labelYes={CommonConstants.DELETE_CONFIRM_YES}
              labelNo={CommonConstants.DELETE_CONFIRM_NO}
              message={CommonConstants.DELETE_CONFIRM_MESSAGE}
          /> 
      </div>
    </>
  );
}

export default MarkdownEditor;