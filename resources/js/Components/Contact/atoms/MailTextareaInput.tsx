import { Control, FieldValues, Path } from 'react-hook-form';
import { Textarea } from '@/Components/ui/textarea';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';

interface MailInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
}

/**
 * メールテキストコンポーネント
 * @param control
 * @param name
 * @param label
 * @param placeholder
 * @returns JSX
 */
function MailTextareaInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
}: MailInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="mb-4">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default MailTextareaInput;
