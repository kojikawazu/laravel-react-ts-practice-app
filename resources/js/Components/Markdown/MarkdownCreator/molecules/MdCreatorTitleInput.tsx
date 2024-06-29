interface MdCreatorTitleInputProps {
    title: string;
    setData: <T>(key: T, value: string) => void;
};

/**
 * [Markdown Creator] タイトルコンポーネント
 * @param title
 * @param setData
 * @returns JSX
 */
const MdCreatorTitleInput = ({
    title,
    setData,
}: MdCreatorTitleInputProps) => {
    return (
        <>
            <label className="block text-amber-700 text-sm font-bold mb-2" htmlFor="title">
                タイトル:
            </label>
            <input
                id="title"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-amber-700 leading-tight focus:outline-none focus:shadow-outline focus:border-amber-300"
                placeholder="タイトルを入力してください。"
                value={title}
                onChange={(e) => setData('title', e.target.value)}
            />
        </>
    );
}

export default MdCreatorTitleInput;