import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WaMdService } from './wa-md.service';

@WebSocketGateway({ namespace: '/wa-md' })
export class WaMdGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly service: WaMdService) {}

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  afterInit(server: any) {
    this.logger.log('Init Multidevice WA Socket Gateway');
  }
  private logger: Logger = new Logger(WaMdGateway.name);

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload);
    return 'Hello world!';
  }
  @SubscribeMessage('connect-wa')
  handleConnect(client: any, payload: any): void {
    this.logger.log('Generate QR from ');
    this.logger.log(payload.deviceId);
    client.join(payload.deviceId);
    // this.server.emit('msgToClient', payload);
    this.service.connect(this.server, payload.deviceId);
  }
  @SubscribeMessage('disconnect-wa')
  async handleDisConnect(client: any, payload: any): Promise<void> {
    this.logger.log('Disconnect ');
    this.logger.log(payload.deviceId);
    client.join(payload.deviceId);
    this.service.disconnect(payload.deviceId);
  }
}
