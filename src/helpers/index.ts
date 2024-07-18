import crypto from 'crypto';
import env from '../utils/validateEnv';

const SECRET = env.SESSION_SECRET;
export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256',[salt, password].join(''))
    .update(SECRET).digest('hex')
};