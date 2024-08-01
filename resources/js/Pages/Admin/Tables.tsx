import { ReactElement } from 'react';
import { Database } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface TablesProps {
    tableColumns: Record<string, string[]>;
}

/**
 * テーブル一覧ページ[admin用]
 * @returns JSX
 */
const Tables = () => {
    const { props } = usePage<PageProps & TablesProps>();
    const { tableColumns, auth } = props;

    if (!auth.user.is_admin) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        アクセスが拒否されました
                    </h1>
                    <p className="text-gray-600">
                        このページを表示する権限がありません。
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
                    <Database className="mr-2" />
                    データベーステーブルとカラム
                </h1>
            </div>

            <div className="space-y-8">
                {Object.entries(tableColumns).map(([table, columns]) => (
                    <div
                        key={table}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="bg-amber-600 text-white px-6 py-4">
                            <h2 className="text-xl font-semibold">
                                テーブル: {table}
                            </h2>
                        </div>

                        <div className="p-6">
                            <ul className="flex flex-wrap gap-3">
                                {columns.map((column, idx) => (
                                    <li
                                        key={idx}
                                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {column}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Tables.layout = (page: ReactElement) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);

export default Tables;
