***
# Viewgin
**Задание** 

Напиcать автотесты  login (positive, negative) , create (positive, negative).  При negative сделать скриншот.

**Тест**
1. авторизироваться на [https://office.ideadeploy.space/](https://office.ideadeploy.space/) сайте;
2. Создать проект на [https://office.ideadeploy.space/projects](https://office.ideadeploy.space/projects) с названием Test Selenium**(timestamp)** , добавив в него сотрудников : Test, Vlad
3.  выбрать дату завершения проекта 30.11.2021

**Дополнительная задача (необязательная к выполнению):**
Добавить гостя в проект имя: Test Selenium 1/2/3/4 (если уже есть с таким номером, то создайте следующий), почта (random)@viewgin.com / пароль: test1234!

**Структура проекта:**
- ***pages*** - директория с классами страниц;
- ***helpers*** - директория с классом, который содержит константы и функцию для рандома букв кода проекта;
- ***tests*** - директория с тестами для страницы входа и добавления проектов;
- ***screenshots*** - директория со снимками экрана при негативных сценариях. Создается только после запуска проекта;
- ***playwright.config.js*** - файл с настройками запуска тестов. В разделе *Configure projects for major browsers* можно раскомментировать другие браузеры, по умолчанию запускается только на движке *chromium*. 

**Запуск**
1. Установите зависимости:
```
npm install
```
2. Запустите тесты. По умолчанию браузер запускается в headless режиме:
```
npm test
```

**Дополнительные команды**

Для запуска отдельного файла с тестами используйте:
```
npx playwright test tests/<имя_файла>
```
Для запуска браузера в режиме headed используйте:
```
npx playwright test --headed
```
