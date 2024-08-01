import { ClipLoader } from 'react-spinners';
import { Button } from '@/Components/ui/button';

interface MailSendButtonProps {
    isSubmitting: boolean;
}

/**
 * メール送信ボタンコンポーネント
 * @param isSubmitting
 * @returns JSX
 */
const MailSendButton = ({ isSubmitting }: MailSendButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={isSubmitting}
            className="mb-4 bg-amber-600"
        >
            {isSubmitting ? <ClipLoader /> : '送信'}
        </Button>
    );
};

export default MailSendButton;
