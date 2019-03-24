@echo OFF
REM aedbug startup script
REM author: Marcin Polak mapoart@gmail.com (MAPO ART)
REM website: marcinpolak.eu
REM date: 14 mar 2019

goto :checknpm

:checknpm
	call npm --version 2> Nul
	if "%errorlevel%" == "0" goto :run
	goto :install

:run
	call npm install
	call npm start
	goto :ends
	
:install
	echo "You don't have npm installed. Please install npm."
	set /P c=Would you like to open the browser to download the latest npm/nodejs [Y/N]?
	if /I "%c%" EQU "Y" goto :installnpm
	if /I "%c%" EQU "N" goto :end

:installnpm	
	call explorer https://nodejs.org/en/
	set /P c=Do you have npm installed [Y/N]?
	if /I "%c%" EQU "Y" goto :checknpm
	if /I "%c%" EQU "N" goto :end
	
:end