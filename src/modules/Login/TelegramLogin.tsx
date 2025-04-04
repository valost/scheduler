import { useEffect } from 'react';

interface TelegramLoginProps {
    botName: string;
    authUrl: string;
    onAuth: (data: any) => void;
}

const TelegramLogin= ({ botName, authUrl, onAuth } : TelegramLoginProps) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-auth-url', authUrl);
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');

        document.body.appendChild(script);

        // Додаємо глобальну функцію для обробки авторизації
        (window as any).onTelegramAuth = (user: any) => {
            onAuth(user);
        };

        return () => {
            document.body.removeChild(script);
            delete (window as any).onTelegramAuth;
        };
    }, [botName, authUrl, onAuth]);

    return <div id="telegram-login"></div>;
};

export default TelegramLogin;