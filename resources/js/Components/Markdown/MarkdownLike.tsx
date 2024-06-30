import { useEffect, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { ToastContainer } from 'react-toastify';
import { useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

/**
 * MarkdownLikeコンポーネントProps
 */
interface MarkdownLikeProps {
    postId: string;
    currentEmoji: string | null;
    likeCounts: Record<string, number>;
};

/**
 * MarkdownLikeコンポーネント
 * @param postId
 * @param currentEmoji
 * @param likeCounts
 * @returns JSX
 */
const MarkdownLike = ({
    postId,
    currentEmoji,
    likeCounts
}: MarkdownLikeProps) => {
    const [emoji, setEmoji] = useState<string | null>(currentEmoji);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [likes, setLikes] = useState<Record<string, number>>(likeCounts);
    const { data, setData, post, delete: destroy } = useForm<{ emoji: string }>({ emoji: '' });

    useEffect(() => {
        if (data.emoji) {
            sendEmoji(data.emoji);
        }
    }, [data.emoji]);

    const addEmoji =  (emojiData: EmojiClickData) => {
        const newEmoji = emojiData.emoji;
        setEmoji(newEmoji);
        setData({ emoji: newEmoji });
        setShowPicker(false);
    };
    
    const sendEmoji = (newEmoji: string) => {
        post(route('markdown.like', postId), {
            onSuccess: () => {
                //console.log('successed');
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [data.emoji]: (prevLikes[data.emoji] || 0) + 1
                }));
            },
            onError: (error) => {
                console.log('error');
                //console.log(error);
            }
        });
    };
    
    const removeEmoji = () => {
        if (emoji) {
            const updatedLikes = { ...likes };
            if (updatedLikes[emoji]) {
                updatedLikes[emoji]--;
                if (updatedLikes[emoji] === 0) {
                    delete updatedLikes[emoji];
                }
            }
            setEmoji(null);
            setLikes(updatedLikes);
            destroy(route('markdown.unlike', postId), {
                onSuccess: () => {}
            });
        }
    };

    return (
        <>
            <ToastContainer />

            <div className="flex items-center">
                {
                    emoji ? (
                        <Button 
                            onClick={removeEmoji} 
                            className="ml-2 mt-2 bg-white hover:bg-white">
                            {emoji}
                        </Button>
                    ) : (
                        <Button 
                            onClick={() => setShowPicker(true)}
                            className="ml-2 mt-2 bg-white hover:bg-white">
                            😀
                        </Button>
                    )
                }

                <div className="flex items-center">
                    {Object.entries(likes).map(([emoji, count]) => (
                        <div key={emoji} className="flex items-center mr-2">
                            <span>{emoji}</span>
                            <span className="ml-1">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {showPicker && <EmojiPicker onEmojiClick={addEmoji} />}
        </>
    );
}

export default MarkdownLike;
