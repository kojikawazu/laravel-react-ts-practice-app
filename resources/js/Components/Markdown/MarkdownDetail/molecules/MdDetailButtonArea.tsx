import { Button } from '@/Components/ui/button';
import MarkdownLinkButton from '@/Components/Markdown/atoms/button/MarkdownLinkButton';

interface MdDetailButtonAreaProps {
    postId: string;
    loginUserId: number;
    postUserId: number;
    handleDelete: (id: string) => void;
};

/**
 * [MarkdownDetail] ボタンエリアコンポーネント
 * @param postId
 * @param loginUserId
 * @param postUserId
 * @param handleDelete
 * @returns JSX
 */
const MdDetailButtonArea = ({
    postId,
    loginUserId,
    postUserId,
    handleDelete,
}: MdDetailButtonAreaProps) => {
    return (
        <>
            <MarkdownLinkButton
                label="Back"
                href="/markdown"
                additionalClasses="mr-2 bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500"
            />

            {loginUserId === postUserId && (
                <>
                    <MarkdownLinkButton
                        label="Update"
                        href={`/markdown/editor/${postId}`}
                        additionalClasses="mr-2 bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-600"
                    />
                    
                    <Button
                        onClick={() => handleDelete(postId)}
                        className="bg-amber-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-amber-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50">
                        Delete
                    </Button>
                </>
            )}
        </>
    )
}

export default MdDetailButtonArea;