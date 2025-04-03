import { useState } from 'react';
import TelegramLogin from './TelegramLogin.tsx';

function LoginPage() {
  const [user, setUser] = useState<any>(null);

  const handleAuth = (userData: any) => {
    setUser(userData);
    console.log('Telegram auth data:', userData);
  };

  return (
    <div>
      <h1>Telegram Аутентифікація</h1>
      {!user ? (
        <TelegramLogin
          botName="@tcs_dso_bot" // Замініть на ім’я вашого бота
          authUrl="https://wired-severely-ghost.ngrok-free.app/login" // Оновіть для ngrok
          onAuth={handleAuth}
        />
      ) : (
        <p>
          Вітаємо, {user.first_name} {user.last_name || ''} (@
          {user.username || 'немає'})!
        </p>
      )}
    </div>
  );
}

export default LoginPage;
