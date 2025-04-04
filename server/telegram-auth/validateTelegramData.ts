import * as crypto from 'crypto'; // Імпорт модуля crypto
import { config } from 'dotenv'; // Імпорт dotenv (npm install dotenv)

// Налаштування dotenv
config();

// Тип для даних від Telegram
interface TelegramData {
    hash?: string;
    auth_date: string;
    [key: string]: string | undefined; // Динамічні ключі (first_name, id тощо)
}

// Конфігурація
const BOT_TOKEN: string = process.env.BOT_TOKEN || '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';
const MAX_AUTH_AGE: number = 86400;

/**
 * Генерує секретний ключ із токена бота
 */
function generateSecretKey(token: string): Buffer {
    return crypto.createHash('sha256').update(token).digest();
}

/**
 * Створює рядок для перевірки на основі даних від Telegram
 */
function createDataCheckString(data: TelegramData): string {
    return Object.keys(data)
        .sort()
        .map((key) => `${key}=${data[key]}`)
        .join('\n');
}

/**
 * Перевіряє валідність даних авторизації від Telegram
 */
function validateTelegramData(data: TelegramData): boolean {
    const dataCopy = { ...data };
    const receivedHash = dataCopy?.hash;
    delete dataCopy.hash;

    const secretKey = generateSecretKey(BOT_TOKEN);
    const dataCheckString = createDataCheckString(dataCopy);

    const computedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    const isHashValid = computedHash === receivedHash;
    const isTimeValid = (Date.now() / 1000 - Number(data.auth_date)) < MAX_AUTH_AGE;

    return isHashValid && isTimeValid;
}

export default validateTelegramData;