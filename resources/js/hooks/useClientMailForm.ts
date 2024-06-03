import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "@/types";
import { contactFormSchema } from "@/lib/schema/contactFormSchema";

/**
 * クライアントメールフォームのProps型定義
 */
interface useClientMailFormProps {
    user: User | null,
};

/**
 * (カスタムhooks)
 * クライアントメールフォーム
 * @param user ユーザー
 * @returns form, loading, onSubmit
 */
export const useClientMailForm = ({
    user,
}: useClientMailFormProps) => {
    const [loading, setLoading]     = useState(true);
    const [csrfToken, setCsrfToken] = useState<string | null>(null);
    const [error, setError]         = useState<string | null>(null);

    const form = useForm<z.infer<typeof contactFormSchema>>({
        /** バリデーションを行っている */
        resolver: zodResolver(contactFormSchema),
        /** デフォルト値 */
        defaultValues: {
            username: "",
            subject: "",
            email: "",
            content: "",
            file: undefined,
        },
    });

    useEffect(() => {
        console.log("useClientMailForm mounted");
        setLoading(false);

        // CSRFトークンを設定
        // Laravel側のcsrfトークンを扱う
        const token = (window as any).Laravel?.csrfToken;
        if (token) {
            setCsrfToken(token);
        } else {
            console.error("CSRF token not found");
        }
    }, []);

    // useCallback 関数コンポーネント内で関数をメモ化
    // 依存リスト内の値が変更されたときにのみ新しいインスタンスを作成し、それ以外の場合は以前のインスタンスを再利用する。
    // これにより、不要な再レンダリングを防ぎ、パフォーマンスを向上させることができる。
    // 
    // 送信用関数(メモ化された関数)
    const onSubmit = useCallback(async (values: z.infer<typeof contactFormSchema>) => {
        if (!user) {
            console.error("User not authenticated");
            return;
        }

        if (!csrfToken) {
            console.error("CSRF token is missing");
            return;
        }

        // データ取り出し
        const {
            username,
            email,
            subject,
            content,
            file,
        } = values;

        // フォームデータに詰め込み
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email",    email);
        formData.append("subject",  subject);
        formData.append("content",  content);
        if (file && file.length > 0) {
            formData.append("file", file[0]);
        }

        try {
            // API側へ送信
            const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/send-mail`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user!.token}`,
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            //console.log("Email sent successfully: ", data);

            // フォームをリセットし、成功フラグを設定
            form.reset();
            setError(null);
        } catch (err) {
            //console.error("Error sending email: ", err);
            console.error("Unexpected error in onSubmit");
            setError("Error");
        }
    }, [user, csrfToken]);

    return {
        form,
        loading,
        onSubmit,
        error,
    }
};