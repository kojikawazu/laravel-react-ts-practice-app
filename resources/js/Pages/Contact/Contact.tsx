import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import ContactLayout from '@/Layouts/ContactLayout';
import MailForm from '@/Components/Contact/MailForm';

/**
 * お問い合わせページ
 * @param auth
 * @returns JSX
 */
function Contact({}: PageProps) {
    const { auth } = usePage<PageProps>().props;
    console.log('MailForm mounted');

    return (
        <div className="min-h-screen bg-amber-100 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden border-4 border-amber-500">
                    <div className="px-6 py-8 sm:p-10">
                        <div className="flex justify-center mb-8">
                            <h2 className="font-serif text-4xl font-bold text-amber-900 border-b-4 border-amber-600 pb-2 flex items-center">
                                お問い合わせフォーム
                            </h2>
                        </div>

                        <div className="text-center mb-8">
                            <p className="text-amber-800">
                                不明点があればいつでもご連絡ください。
                                <br />
                                お客様からのお問い合わせを心よりお待ちしております。
                            </p>
                        </div>

                        <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-300">
                            <MailForm user={auth.user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * お問い合わせレイアウト
 * @param page
 * @returns JSX
 */
Contact.layout = (page: React.ReactElement) => {
    return (
        <AuthenticatedLayout>
            <ContactLayout>{page}</ContactLayout>
        </AuthenticatedLayout>
    );
};

export default Contact;
