import React, { useEffect } from 'react';
import { commands } from '@uiw/react-md-editor';
import { toast, ToastContainer } from 'react-toastify';
import { MarkdownPost } from '@/types/types';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';

import MarkdownTitle from '@/Components/Markdown/atoms/MarkdownTitle';
import MarkdownLinkButton from '@/Components/Markdown/atoms/button/MarkdownLinkButton';
import MarkdownErrorLabel from '@/Components/Markdown/atoms/label/MarkdownErrorLabel';

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

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePut(post.id);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      handleDestroy(post.id);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="container mx-auto p-4">
          <div className="flex justify-center mb-12">
              <MarkdownTitle title={"Markdown Editor"} />
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
                      handleDelete={handleDelete}
                  />
              </div>
          </form>
      </div>
    </>
  );
}

export default MarkdownEditor;