# snapshot.sentnl.io 
EOS Snapshot service


# Build the production container
`git clone  https://github.com/ankh2054/snapshots.sentnl.io.git .`
```
docker build -f Dockerfile.prod  \
--build-arg REACT_APP_ACCESS_KEY_ID=xxxxxxxxxx \
--build-arg REACT_APP_SECRET_ACCESS_KEY=xxxxxxxxx \
-t snapshots.sentnl:prod .
```

# Run the container using nginx proxy

```
docker run  --name snapshots.sentnl.io --expose 80 \
-d -e "VIRTUAL_HOST=snapshots.sentnl.io" \
-e "LETSENCRYPT_HOST=snapshots.sentnl.io" \
-e "LETSENCRYPT_EMAIL=charles.holtzkampf@gmail.com" \
snapshots.sentnl:prod
```
