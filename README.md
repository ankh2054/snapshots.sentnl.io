# snapshot.sentnl.io 
EOS Snapshot service


# Build the production container
`docker build -f https://github.com/ankh2054/snapshots.sentnl.io.git -t snapshots.sentnl:prod.`
`docker build -f Dockerfile.prod -t snapshots.sentnl:prod.`

# Run the container using nginx proxy

```
docker run  --name snapshots.sentnl.io --expose 80 \
-d -e "VIRTUAL_HOST=snapshots.sentnl.io" \
-e "LETSENCRYPT_HOST=snapshots.sentnl.io" \
-e "LETSENCRYPT_EMAIL=charles.holtzkampf@gmail.com" \
snapshots.sentnl:prod

```
