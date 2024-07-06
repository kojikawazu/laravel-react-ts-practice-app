import { useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { User } from '@/types';
import { useClientMailForm } from '@/hooks/useClientMailForm';
import MailSendButton from '@/Components/Contact/atoms/MailSendButton';
import MailFileInput from '@/Components/Contact/atoms/MailFileInput';
import MailInput from '@/Components/Contact/atoms/MailInput';
import { 
  Form,
} from '@/Components/ui/form';

import 'react-toastify/dist/ReactToastify.css';
import MailTextareaInput from './atoms/MailTextareaInput';

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

  // 関数コンポーネントで状態を持たない変数
  // ファイル入力フィールドのDOM要素にアクセスし、その値を操作するため
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // メール送信成功時
  useEffect(() => {
    console.log("MailForm mounted");
    console.log(form.formState.isSubmitSuccessful);
    if (form.formState.isSubmitSuccessful) {
      toast.success("メール送信に成功しました！");

      if (fileInputRef.current) {
        // ファイル入力の値をリセット
        fileInputRef.current.value = "";
      }
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
      <ToastContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container flex flex-col gap-3"
        >
          <MailInput
            control={form.control}
            name="username"
            label="ユーザー名"
            placeholder="ユーザー名"
          />

          <MailInput
            control={form.control}
            name="email"
            label="メールアドレス"
            placeholder="メールアドレス"
          />

          <MailInput
            control={form.control}
            name="subject"
            label="主題"
            placeholder="主題"
          />

          <MailTextareaInput
            control={form.control}
            name="content"
            label="本文"
            placeholder="本文"
          />

          <MailFileInput
            control={form.control}
            fileInputRef={fileInputRef}
          />

          <MailSendButton
            isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </>
);
}

export default MailForm;