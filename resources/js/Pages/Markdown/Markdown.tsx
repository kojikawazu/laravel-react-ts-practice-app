import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import MarkdownCreator from '@/Components/Markdown/MarkdownCreator';
import { PageProps } from '@/types';

function Markdown({}: PageProps) {
  return (
    <div>
      Markdown
      <MarkdownCreator />
    </div>
  );
}

Markdown.layout = (
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

export default Markdown;