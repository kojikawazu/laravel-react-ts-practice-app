import React, { useEffect } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import EmojiPicker from 'emoji-picker-react';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/Components/ui/button';
import { MarkdownPost } from '@/types/types';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';
import MarkdownTitle from './atoms/MarkdownTitle';
import MarkdownLinkButton from './atoms/button/MarkdownLinkButton';
import EmojiButton from './atoms/emoji/EmojiButton';
import MarkdownButton from './atoms/button/MarkdownButton';

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
    errors,
    addEmoji,
    showEmojiPicker,
    setShowEmojiPicker,
    handleChange,
    handlePut,
    handleDestroy,
  } = useMyMarkdown({
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
                  <p className="pl-2">Editor:</p>
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
                    label="Update"
                    additionalClassName="mt-4 mr-4"
                  />

                  <MarkdownButton
                    type="button"
                    label="Delete"
                    additionalClassName="mt-4"
                    onClick={handleDelete}
                  />
              </div>
          </form>
      </div>
    </>
  );
}

export default MarkdownEditor;