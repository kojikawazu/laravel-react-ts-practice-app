   interface MdCreatorImageInputProps {
    handleImageChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
    imagePreview?: string | null;
};

/**
 * [Markdown Creator]画像コンポーネント
 * @param handleImageChange
 * @param imagePreview
 * @returns JSX 
 */
const MdCreatorImageInput = ({
    handleImageChange,
    imagePreview,
}: MdCreatorImageInputProps) => {
    return (
        <>
            <label className="block text-amber-700 text-sm font-bold mb-2" htmlFor="imageFile">
                タイトル画像:
            </label>
            
            <div className="shadow appearance-none border-2 rounded-lg w-full border-amber-200">
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
}

export default MdCreatorImageInput;