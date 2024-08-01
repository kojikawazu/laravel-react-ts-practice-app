import { Button } from '@/Components/ui/button';

interface MarkdownButtonProps {
    type: 'button' | 'submit';
    label: string;
    additionalClassName: string;
    onClick?: () => void;
}

function onClickTemp() {}

/**
 * Markdownボタンコンポーネント
 * @param type
 * @param label
 * @param additionalClassName
 * @param onClick
 * @returns JSX
 */
const MarkdownButton = ({
    type,
    label,
    additionalClassName,
    onClick = onClickTemp,
}: MarkdownButtonProps) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            className={`bg-amber-500 text-amber-100 hover:bg-amber-600 focus:ring-amber-500 ${additionalClassName}`}
        >
            {label}
        </Button>
    );
};

export default MarkdownButton;
