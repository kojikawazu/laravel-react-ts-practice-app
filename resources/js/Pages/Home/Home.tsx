import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HomeLayout from '@/Layouts/HomeLayout';

function Home() {
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
