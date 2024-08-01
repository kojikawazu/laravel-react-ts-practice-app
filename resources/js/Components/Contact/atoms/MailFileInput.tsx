import { Input } from '@/Components/ui/input';
import { Control } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';

interface MailFileInputProps {
    control: Control<
        {
            username: string;
            subject: string;
            email: string;
            content: string;
            file?: FileList | null;
        },
        any
    >;
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
}

/**
 * メール添付画像Inputコンポーネント
 * @param control
 * @param fileInputRef
 * @returns JSX
 */
const MailFileInput = ({ control, fileInputRef }: MailFileInputProps) => {
    return (
        <FormField
            control={control}
            name="file"
            render={({ field: { value, onChange, ref, ...fieldProps } }) => (
                <FormItem className="mb-4">
                    <FormLabel>添付画像</FormLabel>
                    <FormControl>
                        <Input
                            accept="image/*"
                            type="file"
                            placeholder="画像"
                            onChange={(event) => {
                                // ファイル入力フィールドは手動で更新する必要がある。
                                onChange(event.target.files);
                            }}
                            ref={(e) => {
                                // React Hook Formのrefを設定しつつ、fileInputRefにもDOM要素を保存
                                ref(e);
                                fileInputRef.current = e;
                            }}
                            {...fieldProps}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default MailFileInput;
