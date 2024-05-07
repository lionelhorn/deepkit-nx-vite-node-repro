import { eventDispatcher } from "@deepkit/event";
import {  onServerMainBootstrapDone} from "@deepkit/framework";
import { RpcConnectedClientsService } from "./RpcConnectedClientsService.js";

export class ServerEventsListener {
  constructor(
    private rpcStats: RpcConnectedClientsService,
  ) {
  }

  @eventDispatcher.listen(onServerMainBootstrapDone)
  async onServerMainBootstrapDone(
    event: typeof onServerMainBootstrapDone.event
  ) {

    try {
      console.log(event);
      this.rpcStats.register();

    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}




