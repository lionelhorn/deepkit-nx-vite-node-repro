import { createRoot } from "react-dom/client";
import * as React from "react";
import {RpcWebSocketClient} from "@deepkit/rpc";
import {RpcClientTestController} from "@lionelhorn/deepkit-client/RpcClientTestController.js";

const rootEl = document.getElementById("react-root");
if (!rootEl) throw new Error("No react-root element found in the DOM");

(async () => {
  const rpcClient = new RpcWebSocketClient(`ws://127.0.0.1:8080`);
  rpcClient.registerController(RpcClientTestController, "RpcClientTestController");
  await rpcClient.connect()

  const root = createRoot(rootEl);
  root.render(<div>
    <div>ConnectionId: {rpcClient.transporter.connectionId}</div>
    <div>Connected: {rpcClient.transporter.isConnected() ? "yes" : "no"}</div>
  </div>);
})();
