import { ClipLoader } from 'react-spinners';

interface MdDetailImage {
    image_path?: string | null;
    isImageLoading: boolean;
    setIsImageLoading: (isImageLoading: boolean) => void;
}

const MdDetailImage = ({
    image_path,
    isImageLoading,
    setIsImageLoading,
}: MdDetailImage) => {
    return (
        <>
            {image_path && (
                <div
                    className={`p-2  ${!isImageLoading && 'border-2 rounded-lg shadow-xl relative bg-amber-700 border-amber-700'}`}
                >
                    {isImageLoading && (
                        <div className="flex justify-center items-center">
                            <ClipLoader />
                        </div>
                    )}
                    <img
                        src={image_path}
                        alt="Preview"
                        className={`rounded-lg ${isImageLoading ? 'hidden' : 'block'}`}
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => setIsImageLoading(false)}
                    />
                </div>
            )}
        </>
    );
};

export default MdDetailImage;
