import MdDetailImage from '@/Components/Markdown/MarkdownDetail/molecules/MdDetailImage';

interface MdEditorImageInputProps {
    imagePath?: string | null;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imagePreview?: string | null;
}

/**
 * [Markdown Editor]画像コンポーネント
 * @param imagePath
 * @param handleImageChange
 * @param imagePreview
 * @returns JSX
 */
const MdEditorImageInput = ({
    imagePath,
    handleImageChange,
    imagePreview,
}: MdEditorImageInputProps) => {
    return (
        <>
            <label
                className="block text-amber-700 text-sm font-bold mb-2"
                htmlFor="imageFile"
            >
                タイトル画像:
            </label>

            <div className="shadow appearance-none border-2 rounded-lg w-full border-amber-200">
                <div className="text-amber-700 text-sm font-bold mt-4 ml-4 mb-2">
                    <p>現在の画像はこちらになります。</p>
                </div>

                <div className="flex justify-center w-1/2 h-1/2 pt-2 ml-2 mb-2">
                    <MdDetailImage
                        image_path={imagePath}
                        isImageLoading={false}
                        setIsImageLoading={() => {}}
                    />
                </div>

                <input
                    id="imageFile"
                    type="file"
                    onChange={handleImageChange}
                    className="pt-4 pb-2 px-3 text-amber-700 leading-tight focus:outline-none focus:shadow-outline"
                />

                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="p-4" />
                )}
            </div>
        </>
    );
};

export default MdEditorImageInput;
