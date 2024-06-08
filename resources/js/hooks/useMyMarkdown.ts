import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { MDEditorProps } from '@uiw/react-md-editor';
import { EmojiClickData } from 'emoji-picker-react';
import { toast } from 'react-toastify';

export const useMyMarkdown = ({
    content = '',
}: {
    content: string;
}) => {
    const { 
        data, 
        setData, 
        post, put, 
        delete: destroy,
        reset, 
        errors 
    } = useForm({
        content: content,
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const addEmoji = (emojiData: EmojiClickData) => {
        setData('content', data.content + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handleChange: MDEditorProps['onChange'] = (value) => {
        if (value !== undefined) {
            setData('content', value);
        }
    };

    const handlePost = () => {
        post('/markdown', {
            onSuccess: () => {
                reset();
                setShowEmojiPicker(false);
                toast.success('Post submitted successfully');
            },
            onError: () => {
                toast.error('An error occurred while submitting the post');
            },
        });
    };

    const handlePut = (id: string) => {
        put(`/markdown/${id}`, {
            onSuccess: () => {
              toast.success('Post updated successfully');
            },
            onError: () => {
              toast.error('An error occurred while updating the post');
            },
          });
    }

    const handleDestroy = (id: string) => {
        destroy(`/markdown/${id}`, {
            onSuccess: () => {
                toast.success('Post deleted successfully');
                window.location.href = '/markdown';
            },
            onError: () => {
                toast.error('An error occurred while deleting the post');
            }
          });
    }

    return {
        data,
        errors,
        addEmoji,
        showEmojiPicker,
        setShowEmojiPicker,
        handleChange,
        handlePost,
        handlePut,
        handleDestroy,
    };
};