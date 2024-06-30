import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { MDEditorProps } from '@uiw/react-md-editor';
import { EmojiClickData } from 'emoji-picker-react';
import { toast } from 'react-toastify';

/** デバッグ用(リダイレクト時にデータ確認したい場合に使用すること) */
interface DebugInfo {
    handlePostCalled: boolean;
    currentData: {
        content: string;
        title: string;
        imageFile: string;
    };
    imageFileAppended: boolean;
    formDataEntries: Record<string, string>;
}

interface MarkdownFormData {
    title: string;
    imageFile: File | null;
    content: string;
};

/**
 * Markdown用(カスタムhooks)
 * @param content 
 * @returns カスタムhooks
 */
export const useMyMarkdown = ({
    title = '',
    content = '',
}: {
    title: string;
    content: string;
}) => {
    const { 
        data, 
        setData, 
        post, 
        put, 
        delete: destroy,
        reset, 
        errors 
    } = useForm<MarkdownFormData>({
        title: title,
        imageFile: null,
        content: content,
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>('');

    // useEffect(() => {
    //     // ページロード時にLocalStorageからデバッグ情報を確認
    //     const debugInfo = localStorage.getItem('debugInfo');
    //     if (debugInfo) {
    //         console.log('Debug info from previous request:', JSON.parse(debugInfo));
    //         localStorage.removeItem('debugInfo');
    //     }
    // }, []);

    const addEmoji = (emojiData: EmojiClickData) => {
        setData('content', data.content + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    const handleChange: MDEditorProps['onChange'] = (value) => {
        if (value !== undefined) {
            setData('content', value);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            setData('imageFile', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setData('imageFile', null);
            setImagePreview(null);
        }
    };

    const handlePost = () => {
        const debugInfo: DebugInfo = {
            handlePostCalled: true,
            currentData: {
                content: data.content,
                title: data.title,
                imageFile: data.imageFile ? 'File present' : 'No file',
            },
            imageFileAppended: true,
            formDataEntries: {}
        };

        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('title', data.title);
        if (data.imageFile) {
            debugInfo.imageFileAppended = true;
            formData.append('imageFile', data.imageFile);
        }

        // FormDataの内容を確認
        for (let [key, value] of formData.entries()) {
            debugInfo.formDataEntries[key] = value instanceof File ? `File: ${value.name}` : value.toString();
        }
        // デバッグ情報をLocalStorageに保存
        localStorage.setItem('debugInfo', JSON.stringify(debugInfo));

        post('/markdown', {
            data: formData,
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowEmojiPicker(false);
                toast.success('投稿に成功しました。');
            },
            onError: () => {
                toast.error('投稿に失敗しました。');
            },
        });
    };

    const handlePut = (id: string) => {
        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('title', data.title);
        if (data.imageFile) {
            formData.append('imageFile', data.imageFile);
        }

        post(`/markdown/${id}`, {
            data: formData,
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
              toast.success('投稿の更新に成功しました。');
            },
            onError: () => {
              toast.error('投稿の更新に失敗しました。');
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
        setData,
        errors,
        addEmoji,
        showEmojiPicker,
        setShowEmojiPicker,
        imagePreview,
        setImagePreview,
        handleChange,
        handleImageChange,
        handlePost,
        handlePut,
        handleDestroy,
    };
};