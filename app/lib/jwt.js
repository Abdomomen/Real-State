import * as jose from 'jose';

const ACCESS_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || "default_access_secret");
const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret");

export async function generateToken(payload) {
    return await new jose.SignJWT({ id: payload.id, email: payload.email, role: payload.role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(ACCESS_SECRET);
}

export async function generateRefreshToken(payload) {
    return await new jose.SignJWT({ id: payload.id, email: payload.email, role: payload.role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(REFRESH_SECRET);
}

export async function verifyToken(token, type = 'access') {
    try {
        const secret = type === 'access' ? ACCESS_SECRET : REFRESH_SECRET;
        const { payload } = await jose.jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}
