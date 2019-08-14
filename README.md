# Translations

Mapping translations of feminist literature in Europe 1750-1930.

#### Developers

[Mark Turner](https://github.com/markdturner)
[Fiona Galston](https://github.com/fiona-galston)
[Kate Court](https://github.com/KateCourt)

#### Researchers

[Laura Kirkley](https://www.ncl.ac.uk/elll/staff/profile/laurakirkley.html#background)  
[James Cummings](https://www.ncl.ac.uk/elll/staff/profile/jamescummings.html#background)
[Tiago Sousa Garcia](https://www.ncl.ac.uk/elll/staff/profile/tiagosousa-garcia.html#background)

## Development Build

The application is built on Angular 7.2. It uses NPM for its package management and Angular CLI for its build process.

###

The development build uses a generic node 8 container with a mounted volume containing all the source code. The compose file uses the command option to pass a sequence of bash commands to setup the environment.

1. Change directory into the mounted volume
2. Globally install angular-cli
3. Install application dependencies
4. Rebuild the node-sass dependency from source
5. Start the development webserver

The full command can be seen in the `docker-compose-dev.yaml` file.

Run the container using docker compose

```
docker-compose -f docker-compose-dev.yaml up -d
```

The container will start immediately but the application will take some time to start whilst it installs all the dependencies. Once it has started it will be available on [localhost:4200](http://localhost:4200). This command runs the container in detached mode so there will be no log output. To view logs run

```
docker-compose -f docker-compose-dev.yaml logs client
```

Alternatively to always see the log output, run in attached mode with

```
docker-compose -f docker-compose-dev.yaml up
```

To enter the container run

```
docker-compose -f docker-compose-dev.yaml exec client bash
```

## Production Build
