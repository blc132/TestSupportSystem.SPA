# SysEgz
### On-line system supporting tests for learning ofprogramming

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Screenshots](#screenshots)


## General info
Web application that facilitates the process of testing and exams in the field of programming. It allows students to solve tasks in an integrated online development environment and to check the correctness of solved tasks. Teachers can create new tasks, add students and groups.

The system contains three main components: API for system management (API - Zarządzanie systemem), code compilation system (API - Kompilator kodu) and client application (Klient). The diagram of the system is presented below:

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/Diagram.png?raw=true)

## Technologies
- API for system management:
	- C#
	- .NET Core 3.0 WebApi
	- EntityFrameworkCore
	- AutoMapper
	- JwtToken
	- AspNetCore.Identity
	- FluentValidation
	- MediatR
	- Microsoft SQL Server

- Client Application:
	- ReactJs
	- TypeScript
	- MobX
	- SemanticUI
	- CodeMirror
	- Axios
	- Revalidate

- Code Compilation System ([judge0api](https://github.com/judge0/api "judge0api")):
	- Docker
	- Ruby on Rails
	- PostgreSQL

## Setup
### API for system management
To launch the application, download the code from the GIT repository under the link: https://github.com/blc132/TestSupportSystem.API.

For proper operation of the application you need the .NET Core 3.0 SDK:
https://dotnet.microsoft.com/download/dotnet-core/3.0

And Visual Studio Community/Professional/Enterprise 2019:
https://visualstudio.microsoft.com/pl/vs/

After installing the IDE and SDK, the downloaded project should be run by Visual Studio. The integrated development environment should automatically download the packages that are missing in the solution. Then in Package Manager Console, select Persistence project as default and enter two commands:
```javascript
$ Enable-Migrations
$ Update-Database
```
Thanks to these commands the application should create a database which will be located on the local system server. ConnectionString to the database is located in project API in appsettings.json file.  After successful creation of API database for system management it should start working.

### Code Compilation System
To start the application you must have downloaded Docker on your system.  Specific data about installing Docker on specific systems can be found on its main page:
https://www.docker.com/

Then turn on the Docker's console and download the judge0/api:
```javascript
$ docker pull judge0/api
$./scripts/dev-shell
```
After downloading the image, copy the contents of the dojudge0-api.conf.default file to judge0-api.conf. Most likely the judge0-api.conf file will not exist, so you have to create it. Besides that (this happened to me for example). Grant permissions to the files:
```javascript
$ sudo chmod 777 -R ./db/
$ sudo chmod 777 -R ./tmp/
```
After these actions you can run the server part of the API with a command:
```javascript
$ ./scripts/run-server
```
In addition to the server part, you should also run the workers with the following commands:
```javascript
$ ./scripts/dev-shell
$ ./scripts/run-workers
```
After these commands, everything should work. You can check this by going to the documentation at http://www.XXX.XXX.XX.XXX:3000, where "XXX.XXX.XXX.XXX" means the IP on which the Docker is running. The Ip is displayed when the Docker starts up in the text: "docker is configured to use the default machine with IP XXX.XXX.XXX.XX.XXX".

### Client
To run the client we need the code from the GIT repository:
https://github.com/blc132/TestSupportSystem.SPA 

And also npm:
https://nodejs.org/en/download/

After downloading all the components, enter the folder of the downloaded GIT repository through the console:
```javascript
$ npm install
$ npm start
```
After these commands the application should be launched on
http://www.localhost:3000

### Integration of modules
In order for the client to communicate to a good address it is necessary to check on which API was enabled (for system management), copy the address and paste it into agent.ts file:
```javascript
axios.defaults.baseURL = "https://localhost:44323/api"
```
The same should be done for the management API communication with the code compilation system. Check API address for compiling code, then paste it into Startup class in API project:
```csharp
var apiCompilerUri = new Uri("http://192.168.99.100:3000/");
```
Thanks to these steps the system should be fully functional


## Screenshots
![](https://raw.githubusercontent.com/blc132/TestSupportSystem.SPA/master/images/1%20Landing%20Page.PNG)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/2%20Rejestracja.PNG?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/2_1%20Walidacja.PNG?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/3%20Logowanie.PNG?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/4%20Lista%20kursow.PNG?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/5%20Dodawanie%20kursu.PNG?raw=true)



![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/5_1%20Po%20dodaniu.PNG?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/6%20Lista%20zadan.PNG?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/7%20Dodaj%20zadanie.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/8%20Podglad%20zadania.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/9%20Lista%20grup.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/10%20Podglad%20grupy.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/10_1%20Podglad%20grupy.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/11%20Dodawanie%20studenta.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/12%20Rozwiazywanie%20zadania.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/12_1%20Rozwiazanie%20zadania.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/13%20Podglad%20grupy%20po%20zrobieniu%20zadania%20student.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/14%20Podlgad%20rozwiazanego%20zadania.png?raw=true)

![](https://github.com/blc132/TestSupportSystem.SPA/blob/master/images/15%20Zle%20rozwiazane%20zadanie.png?raw=true)

