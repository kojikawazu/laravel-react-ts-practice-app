import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "@/types";
import { contactFormSchema } from "@/lib/schema/contactFormSchema";

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
    const [loading, setLoading] = useState(true);
    const [csrfToken, setCsrfToken] = useState<string | null>(null);

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
        const token = (window as any).Laravel?.csrfToken;
        if (token) {
            setCsrfToken(token);
        }
    }, []);

    const onSubmit = useCallback(
        async (values: z.infer<typeof contactFormSchema>) => {
        if (!user) {
            console.error("User not authenticated");
            return;
        }

        if (!csrfToken) {
            console.error("CSRF token is missing");
            return;
        }

        const {
            username,
            email,
            subject,
            content,
            file,
        } = values;

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email",    email);
        formData.append("subject",  subject);
        formData.append("content",  content);
        if (file && file.length > 0) {
            formData.append("file", file[0]);
        }
        

        try {
            const url = process.env.APP_BASE_URL + "/send-mail";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user!.token}`,
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Email sent successfully: ", data);
        } catch (err) {
            console.error("Error sending email: ", err);
        }
    }, [user, csrfToken]);

    return {
        form,
        loading,
        onSubmit,
    }
};