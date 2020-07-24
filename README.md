
![SVG logo](https://www.sentnl.io/sentnl.svg)
          ![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)

# Sentnl.io  



# Automated frontend companion that pulls snapshots from S3/WASABI 

**This docker container:**

1. React frontend that pulls snapshots from S3/Wasabi 
2. The is a companion service to https://github.com/ankh2054/snapshot-service so please make sure you first set that up.

:pound: NOTE that Wasabi only costs £5 pcm for 1TB :pound:

## Requirements

In order to run this I would recommend installing the following two containers that will act as a HTTP proxy to all your containers and automatically create HTTPs certificates on your behalf.


* https://github.com/nginx-proxy/nginx-proxy
* https://github.com/nginx-proxy/docker-letsencrypt-nginx-proxy-companion


## ENV Variables

|ENV & ARG                       |Value                                  |Description                           |
|--------------------------------|---------------------------------------|--------------------------------------|
|**REACT_APP_ACCESS_KEY_ID**     |`XXXXXXXXXXXXXXXX`                     | Wasabi/S3 access key        		    |
|**REACT_APP_SECRET_ACCESS_KEY** |`XXXXXXXXXXXXXXXX`                     | Wasabi/S3 secret key 				|

## Step 1 - Clone and Build the docker container from github.


```git clone  https://github.com/ankh2054/snapshots.sentnl.io.git```

### The following ENV variables need to be passed:

- **REACT_APP_ACCESS_KEY_ID** - Your Wasabi/S3 API access key
- **REACT_APP_SECRET_ACCESS_KEY** - Your Wasabi/S3 API secret key


**To build it:**

```
docker build -f Dockerfile.prod  \
--build-arg REACT_APP_ACCESS_KEY_ID=xxxxxxxxxx \
--build-arg REACT_APP_SECRET_ACCESS_KEY=xxxxxxxxx \
-t snapshots.sentnl:prod .
```

## Step 2 - Running the docker container.

The final step is to start the container. 

* The container below only exposes port 80 and therefore you will need the compaion container listed above to run this.
* If you choose not to use the companion containers adjust accordingly. You can for instance open up port 80 on your locahost that points to the container directly by removing `--expose 80` and adding `-p 80:80`. 
* Please make your own decisions on this one and don't bug us for support on that.

### The following ENV variables need to be passed only if you are running the companion containers:

**VIRTUAL_HOST** - The full A record including domain of your website
**LETSENCRYPT_HOST** - The full A record including domain of your website
**LETSENCRYPT_EMAIL** - Email address to be registered against your SSL certificate from lets encrypt

```
docker run  --name snapshots.sentnl.io --expose 80 \
-d -e "VIRTUAL_HOST=snapshots.sentnl.io" \
-e "LETSENCRYPT_HOST=snapshots.sentnl.io" \
-e "LETSENCRYPT_EMAIL=charles.holtzkampf@gmail.com" \
snapshots.sentnl:prod
```
