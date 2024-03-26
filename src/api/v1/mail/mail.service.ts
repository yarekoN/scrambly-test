import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendSuccessfulBookingMail(email: string, roomId: string) {
    console.log(
      `Mail sent to ${email} after successful booking of room ${roomId}`,
    );
  }
}
