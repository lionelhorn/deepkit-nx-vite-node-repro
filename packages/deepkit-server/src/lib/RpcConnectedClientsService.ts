import { RpcKernel, RpcKernelConnection, Session } from "@deepkit/rpc";
import {uuid} from "@deepkit/type";
import {RpcClientTestController} from "@lionelhorn/deepkit-client";

export class RpcConnectedClientsService {

  private connected: number = 0;
  public connections: Map<string, RpcKernelConnection>;

  constructor(private rpcKernel: RpcKernel) {
    this.connections = new Map<string, RpcKernelConnection>();
  }

  register() {
    console.log("Registering rpc connections listener");

    this.rpcKernel.onConnection((connection) => {
      this.connected++;
      const connectionId = uuid();
     this.connections.set(uuid(), connection);

      (async () => {
        console.log(`Calling downloadBig on client`)

        const controller = connection.controller<RpcClientTestController>("RpcClientTestController");

        // following line never returns
        const res = await controller.downloadBig(105000);

        // works
        // const res = await controller.downloadBig(90000);

        console.log(`downloadBig res`, res);
      })()

      connection.onClose.then(
        () => {
          this.connected--;

            this.connections.delete(connectionId);
        }
      );
    });
  }
}
