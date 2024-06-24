import React, { useEffect } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import EmojiPicker from 'emoji-picker-react';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/Components/ui/button';
import { MarkdownPost } from '@/types/types';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';
import MarkdownTitle from './atoms/MarkdownTitle';
import MarkdownButton from './atoms/MarkdownButton';

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

      <div className="container mx-auto p-4 bg-slate-800">
          <div className="flex justify-center mb-4">
              <MarkdownTitle title={"Markdown Editor"} />
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
                  <Button 
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="mt-4 mr-4">
                      {showEmojiPicker ? 'Close' : '☻'}
                  </Button>
                  
                  {showEmojiPicker && <EmojiPicker onEmojiClick={addEmoji} />}
                  
                  <Button type="submit" className="mt-4">Update</Button>
                  <Button type="button" onClick={handleDelete} className="mt-4 ml-4">Delete</Button>
              </div>
          </form>
      </div>
    </>
  );
}

export default MarkdownEditor;