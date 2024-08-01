import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';
import { PageProps } from '@/types';

function Home({}: PageProps) {
    return <div>Home</div>;
}

Home.layout = (page: React.ReactElement) => {
    return (
        <AuthenticatedLayout>
            <HomeLayout>{page}</HomeLayout>
        </AuthenticatedLayout>
    );
};

export default Home;
