# FILM!

## Установка

### PostgreSQL

Установите PostgreSQL скачав дистрибутив с официального сайта.

- Создайте базу данных `films`. 
- Создайте пользователя `student` с паролем `student`. 
- Выполните sql код в файле `backend/test/prac.init.sql` для создания таблиц. 
- Заполните данными с помощью скриптов `backend/test/prac.films.sql` и `backend/test.prac.shedules.sql`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости помощью команды

`npm ci`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

- `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `postgres`.
- `DATABASE_NAME` - название базы данных, например `films`
- `DATABASE_PORT` - порт, по умолчанию `5432`
- `DATABASE_HOST` - хост, по умолчанию `localhost`
- `DATABASE_USERNAME` - имя пользователя.
- `DATABASE_PASSWORD` - пароль пользователя.

Запустите бэкенд:

`npm run start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.
