import { useRef, useState, FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium mb-2 text-amber-900 border-b border-amber-900">
                    アカウントの削除
                </h2>

                <p className="mt-1 text-sm text-amber-700">
                    アカウントが削除されると、そのリソースとデータはすべて永久に削除されます。アカウントを削除する前に、保持したいデータや情報をダウンロードしてください。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                アカウントの削除
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-amber-900">
                        本当にアカウントを削除しますか？
                    </h2>

                    <p className="mt-1 text-sm text-amber-600">
                        アカウントが削除されると、そのリソースとデータはすべて永久に削除されます。パスワードを入力して、アカウントの永久削除を希望することを確認してください。
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="パスワード"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            キャンセル
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            アカウントの削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
