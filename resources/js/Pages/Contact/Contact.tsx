import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import { PageProps } from '@/types';
import MailForm from '@/Components/Contact/MailForm';
import { usePage } from '@inertiajs/react';

/**
 * お問い合わせページ
 * @param param0 
 * @returns JSX
 */
function Contact({}: PageProps) {
  const { auth } = usePage<PageProps>().props;
  console.log("MailForm mounted");

  return (
    <div className="fiex flex-col min-h-screen items-center p-12">
      <h2 className="font-semibold text-2xl mb-4">
        お問い合わせフォーム
      </h2>
      <MailForm user={auth.user} />
    </div>
  );
}

/**
 * お問い合わせレイアウト
 * @param page 
 * @returns JSX
 */
Contact.layout = (
  page: React.ReactElement
) => {
    return (
        <AuthenticatedLayout>
            <HomeLayout>
              {page}
            </HomeLayout>
        </AuthenticatedLayout>
    );
}

export default Contact;