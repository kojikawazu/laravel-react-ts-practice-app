export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    token: string;
    is_admin: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
