import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WaService } from './wa.service';

@WebSocketGateway({ namespace: '/wa' })
export class WaGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger(WaGateway.name);
  @WebSocketServer() server: Server;

  constructor(private readonly service: WaService) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload);
    return 'Hello world!';
  }

  @SubscribeMessage('events')
  handleEvent(client: Socket, data: string): string {
    return data;
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, payload: any): Promise<string> {
    this.logger.log('Send message');
    this.logger.log(payload.deviceId);
    client.join(payload.deviceId);
    let noHp = payload.to;
    const prefix = noHp.substring(0, 2);
    if (prefix == '08') {
      noHp = '62' + noHp.substr(1);
    }

    await this.service.sendMessage(
      payload.deviceId,
      `${noHp}@s.whatsapp.net`,
      payload.message,
      'message',
    );
    return 'Message has sent successfully';
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
  handleDisConnect(client: any, payload: any): void {
    this.logger.log('Disconnect ');
    this.logger.log(payload.deviceId);
    client.join(payload.deviceId);
    // this.server.emit('msgToClient', payload);
    this.service.disconnect(payload.deviceId);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
