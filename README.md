# Product-Managment-System

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Backend server

Open the ASP .NET CORE WEB API and run the following commands in the package manager console
1 add-migration initialize-db
2 update-database
After that you will see ProductManagmentSystemDB database in your MSSQL with some pre-defined data 
for the product and one username

## Workflow of the application

You need to login after you start both - the backend server and the localhost server for the Angular application.The username is admin and the password 123.If you want ofcourse you can sign up for new account 
and use that account for login.After the login you can see the three products that were created with the ASP .NET CORE WEB API.You can add new products,edit them or delete them.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

