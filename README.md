### Deepkit rpc client controller paylaod > 100ko issue

```shell
pnpm install
```

Repro
```shell
nx run deepkit-app:serve-vite

#Once the server is running
nx run frontend:dev:vite

#Open the browser and go to http://127.0.0.1:5174
```

# Issue
packages/deepkit-server/src/lib/RpcConnectedClientsService.ts:28
=> Doest not return with payload > 100ko
 
