import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium mb-2 text-amber-900 border-b border-amber-900">
                    プロフィール情報
                </h2>

                <p className="mt-1 text-sm text-amber-700">
                    アカウントのプロフィール情報とEメールアドレスを更新してください。
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="お名前" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-amber-800">
                            メールアドレスが未確認です。
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-amber-600 hover:text-amber-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                こちらをクリックして認証メールを再送信してください。
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                あなたのEメールアドレスに新しい認証リンクが送信されました。
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-amber-600">保存しました。</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
