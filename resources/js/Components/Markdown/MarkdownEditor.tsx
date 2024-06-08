import React, { useEffect, useState } from 'react';
import MDEditor, { MDEditorProps, commands } from '@uiw/react-md-editor';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { toast, ToastContainer } from 'react-toastify';
//import { Link, useForm } from '@inertiajs/inertia-react';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { MarkdownPost } from '@/types/types';
import { useMyMarkdown } from '@/hooks/useMyMarkdown';

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

      <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold mb-4">Markdown Editor</h1>
              <Link href="/markdown" className="bg-gray-500 text-white p-2 rounded">Back</Link>
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