# CONTENTS OF THIS FILE

 * [Requirements](#REQUIREMENTS)
 * [Quickstart](#QUICKSTART)
 * [Helper Scripts](#HELPER SCRIPTS)

# REQUIREMENTS

For Linux and Windows this project requires that you have the latest versions of the following installed:

 * [Docker](https://www.docker.com)
 * [Docker Compose](https://docs.docker.com/compose)
 
For Mac OS you must have the following installed:

 * [Dinghy](https://github.com/codekitchen/dinghy)

# QUICKSTART

From the root directory of the repository run the following:

```bash
bin/up.sh               # create the docker containers 
```

You can tail the combined logs of all containers with this command:

```bash
bin/logs.sh
```

You may see some transient errors during startup. This is due to initialisation dependencies between containers. The environment has been configured to restart services on failure so just wait a bit and see there's still an issue.

After a minute or so you should no longer see any errors or restarts occurring. To be certain you can check the logs of each of the main services as follows:

```bash
bin/logs.sh db            # database server
bin/logs.sh api           # api server 
bin/logs.sh traefik       # proxy server
```

If developing on Windows or Linux, Before testing you will need to add some entries to your hosts file:

```bash

127.0.0.1       adminer.nestjs.docker
127.0.0.1       api.nestjs.docker
```

For Mac OS you do not need to set these up as Dinghy runs it's own DNS server.

You are now ready to login to the local environment. There are several web services you can now access:

* [http://adminer.nestjs.docker](http://adminer.nestjs.docker)                # Adminer interface for the db
* [http://api.nestjs.docker/graphql](http://api.nestjs.docker/graphql)        # Graphql playground for API server

Currently there are some test fixtures which pre-load basic data and a user with credentials:

```
username: admin@example.com
password: !Pa55word
```

You can login with these at [http://admin.nestjs.docker](http://admin.nestjs.docker).

# HELPER SCRIPTS

There are some utility scripts in the bin directory for making it easier to call common commands within the docker environment:

 * `bin/up.sh` will build/re-build the docker containers and start them in background mode
 * `bin/down.sh` will remove the docker containers
 * `bin/start.sh` will start the docker containers
 * `bin/stop.sh` will stop the docker containers
 * `bin/restart.sh` will restart the docker containers
 * `bin/start.sh <api|db|adminer>` will start a specific docker container
 * `bin/stop.sh <api|db|adminer>` will stop a specific docker container
 * `bin/restart.sh <api|db|adminer>` will restart an individual component
 * `bin/logs.sh` will display the docker logs for all containers
 * `bin/logs.sh <api|db|adminer|app|traefik>` will display the docker logs for the respective components
 
