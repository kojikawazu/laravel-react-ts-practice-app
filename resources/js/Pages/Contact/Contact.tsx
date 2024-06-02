import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import { PageProps } from '@/types';
import MailForm from '@/Components/Contact/MailForm';

function Contact({}: PageProps) {
  return (
    <div>
      Home
      <MailForm />
    </div>
  );
}

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