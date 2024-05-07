import { rpc } from "@deepkit/rpc";

@rpc.controller("RpcClientTestController")
export class RpcClientTestController {

  @rpc.action()
  downloadBig(size: number): Uint8Array {
    console.log("downloadBig", size);
    return new Uint8Array(size);
  }
}
