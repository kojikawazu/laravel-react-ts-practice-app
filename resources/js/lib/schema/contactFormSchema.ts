import { z } from 'zod';

/** 定数群 */
const USER_NAME_MIN = 2;
const SUBJECT_MIN = 2;
const CONTENT_MIN = 10;
const CONTENT_MAX = 160;
const IMAGE_MAX_MB = 10;
const IMAGE_MAX_FILE_SIZE = IMAGE_MAX_MB * 1024 * 1024;

const ACCEPTED_IMAGE_TYPE = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

/**
 * お問い合わせ用のフォームスキーマ
 */
export const contactFormSchema = z.object({
    username: z.string().min(USER_NAME_MIN, {
        message: `ユーザー名は${USER_NAME_MIN}文字以上で入力してください。`,
    }),
    subject: z.string().min(SUBJECT_MIN, {
        message: `主題は${SUBJECT_MIN}文字以上で入力してください。`,
    }),
    email: z.string().email({
        message: '適切なメールアドレスで入力してください。',
    }),
    content: z
        .string()
        .min(CONTENT_MIN, {
            message: `本文は${CONTENT_MIN}文字以上で入力してください。`,
        })
        .max(CONTENT_MAX, {
            message: `本文は${CONTENT_MAX}文字以上で入力してください。`,
        }),
    file: z
        .custom<FileList | null | undefined>()
        .optional()
        .refine(
            (files) =>
                files === undefined ||
                files === null ||
                files.length === 0 ||
                (files.length > 0 && files[0].size <= IMAGE_MAX_FILE_SIZE),
            {
                message: `画像サイズは${IMAGE_MAX_MB}MBまでです。`,
            }
        )
        .refine(
            (files) =>
                files === undefined ||
                files === null ||
                files.length === 0 ||
                ACCEPTED_IMAGE_TYPE.includes(files[0].type),
            {
                message: '.jpeg, .jpg, .png, .webpのファイルのみ利用できます。',
            }
        ),
});
