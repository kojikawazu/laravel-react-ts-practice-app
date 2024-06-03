import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { User } from '@/types';
import { useClientMailForm } from '@/hooks/useClientMailForm';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components//ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';

interface MailFormProps {
  user: User;
};

/**
 * メールフォームコンポーネント
 * @param user ユーザー 
 * @returns JSX
 */
const MailForm = ({
  user,
}: MailFormProps) => {
  const {
    form,
    loading,
    onSubmit,
    error,
  } = useClientMailForm({ user });

  // メール送信成功時
  useEffect(() => {
    console.log("MailForm mounted");
    if (form.formState.isSubmitSuccessful) {
      toast.success("メール送信に成功しました！");
    }
  }, [form.formState.isSubmitSuccessful]);
  
  // メール送信失敗時
  useEffect(() => {
    if (error) {
      toast.error(`メール送信に失敗しました: ${error}`);
    }
  }, [error]);

  if (loading) {
    return <ClipLoader />
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container flex flex-col gap-3"
        >
          <FormField 
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem 
                className="mb-4"
              >
                <FormLabel>ユーザー名</FormLabel>
                <FormControl>
                  <Input placeholder="ユーザー名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem
                className="mb-4"
              >
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="メールアドレス" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem
                className="mb-4"
              >
                <FormLabel>主題</FormLabel>
                <FormControl>
                  <Input placeholder="主題" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem
                className="mb-4"
              >
                <FormLabel>本文</FormLabel>
                <FormControl>
                  <Textarea placeholder="本文" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field: {value, onChange, ...fieldProps }}) => (
              <FormItem
                className="mb-4"
              >
                <FormLabel>添付画像</FormLabel>
                <FormControl>
                  <Input
                    accept="image/*"
                    type="file"
                    placeholder="画像"
                    onChange={(event) => {
                      onChange(event.target.files);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mb-4"
          >
            {form.formState.isSubmitting 
              ? <ClipLoader /> 
              : "送信"
            }
          </Button>
        </form>
      </Form>
    </>
);
}

export default MailForm;