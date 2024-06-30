import MDEditor from '@uiw/react-md-editor';

interface MdDetailPreviewProps {
    postContent: string;
};

const MdDetailPreview = ({
    postContent,
}: MdDetailPreviewProps) => {
    return (
        <div 
            data-color-mode="light"
            data-testid="md-detail-preview"
            className="w-full h-72 bg-white mb-4 p-4 rounded-2xl border-8 border-amber-500">
            <MDEditor.Markdown
                source={postContent}
            />
        </div>
    );
}

export default MdDetailPreview;