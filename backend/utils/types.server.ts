// Create and export a type defining the fields the register form will 
// provide in another new file within app / utils named types.server.ts.

export type RegisterForm = {
    email: string
    password: string
    firstName: string
    lastName: string
}

export type LoginForm = {
    email: string
    password: string
}

export interface Session {
    id: string;
    dateCreated: number;
    username: string;
    /**
     * Timestamp indicating when the session was created, in Unix milliseconds.
     */
    issued: number;
    /**
     * Timestamp indicating when the session should expire, in Unix milliseconds.
     */
    expires: number;
}

/**
 * Identical to the Session type, but without the `issued` and `expires` properties.
 */
export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
    token: string,
    expires: number,
    issued: number
}

export type DecodeResult =
    | {
        type: "valid";
        session: Session;
    }
    | {
        type: "integrity-error";
    }
    | {
        type: "invalid-token";
    };

export type ExpirationStatus = "expired" | "active" | "grace";
