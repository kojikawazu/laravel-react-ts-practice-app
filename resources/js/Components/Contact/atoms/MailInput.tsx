import { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/Components/ui/input';
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
};

function MailInput<T extends FieldValues> ({
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
            <FormItem
                className="mb-4"
            >
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
    );
}

export default MailInput;