export interface ProtectedData {
        user: {
                id: number | null;
                username: string;
                iat: number | null;
                exp: number | null;
        }
}
