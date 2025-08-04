import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_HEX = process.env.NEXT_PUBLIC_PASSWORD_ENCRYPTION_KEY;

console.log('############', KEY_HEX);
if (!KEY_HEX) {
  throw new Error('PASSWORD_ENCRYPTION_KEY is not defined in the environment.');
}

const KEY = Buffer.from(KEY_HEX, 'hex');

if (KEY.length !== 32) {
  throw new Error(`Invalid PASSWORD_ENCRYPTION_KEY length: expected 32 bytes, got ${KEY.length}`);
}

export const encryptPassword = (password: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decryptPassword = (encrypted: string): string => {
  const [ivHex, authTagHex, encryptedHex] = encrypted.split(':');
  if (!ivHex || !authTagHex || !encryptedHex) {
    throw new Error('Invalid encrypted string format');
  }
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
};
