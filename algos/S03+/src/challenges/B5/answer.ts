/**
 * In this challenge, you want to compute stats about your chat usage. Your
 * main goal is to see when, during the day, your chat is mostly used. To
 * do so, you should create a function that, for a given list of messages and
 * 2 datetimes returns hour by hour the number of messages sent, in the given
 * time interval.
 *
 * The computed result must contain all one-hour data even if there is no message
 * in it. The result must contain the time interval (so from datetime and to datetime
 * params must be rounded down and up if they have some minutes, for instance the datetime interval
 * from "2023-11-10T10:30:00.000Z" to "2023-11-10T12:15:00.000Z" must be treated as
 * from "2023-11-10T10:00:00.000Z" to "2023-11-10T13:00:00.000Z")
 *
 * Tip 1: the input messages list is not sorted chronologically
 * Tip 2: when rounding up "2023-11-10T23:10:00.000Z" you should be careful to add a day and set the hour to 00:00
 *
 * Example:
 * Input:
 *  - messages: [
 *      { content: "...", sentAt: "2023-11-08T21:00:01.000Z" },
 *      { content: "...", sentAt: "2023-11-10T02:04:00.000Z" },
 *      { content: "...", sentAt: "2023-11-10T10:24:00.000Z" },
 *      { content: "...", sentAt: "2023-11-10T10:26:00.000Z" },
 *      { content: "...", sentAt: "2023-11-12T20:12:00.000Z" },
 *      { content: "...", sentAt: "2023-11-12T20:18:00.000Z" },
 *      { content: "...", sentAt: "2023-11-12T23:54:00.000Z" },
 *  ]
 *  - fromDatetime: "2023-11-10T10:30:00.000Z"
 *  - toDatetime: "2023-11-12T21:00:00.000Z"
 *
 * Output should be: [
 *      { fromDatetime: "2023-11-10T10:00:00.000Z", toDatetime: "2023-11-10T11:00:00.000Z", messagesCount: 2 },
 *      { fromDatetime: "2023-11-10T11:00:00.000Z", toDatetime: "2023-11-10T12:00:00.000Z", messagesCount: 0 },
 *      ...,
 *      { fromDatetime: "2023-11-10T23:00:00.000Z", toDatetime: "2023-11-11T00:00:00.000Z", messagesCount: 0 },
 *      ...,
 *      { fromDatetime: "2023-11-12T20:00:00.000Z", toDatetime: "2023-11-12T21:00:00.000Z", messagesCount: 2 }
 *  ]
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  messages,
  fromDatetime,
  toDatetime,
}: {
  messages: Message[];
  fromDatetime: string;
  toDatetime: string;
}): MessageStatsSlot[] {
  const ONE_HOUR = 3_600_000;
  const result: MessageStatsSlot[] = [];

  // Grooming des dates bornes
  const fromDate = new Date(fromDatetime);
  fromDate.setUTCMinutes(0, 0, 0);
  const toDate = new Date(toDatetime);
  if (
    toDate.getUTCMinutes() !== 0 ||
    toDate.getUTCSeconds() !== 0 ||
    toDate.getUTCMilliseconds() !== 0
  ) {
    toDate.setUTCHours(toDate.getUTCHours() + 1, 0, 0, 0);
  }

  // Initialisation des objets et des compteurs de messages à 0
  const start = fromDate.getTime();
  const end = toDate.getTime();
  for (let time = start; time < end; time += ONE_HOUR) {
    result.push({
      fromDatetime: new Date(time).toISOString(),
      toDatetime: new Date(time + ONE_HOUR).toISOString(),
      messagesCount: 0,
    });
  }

  messages.forEach((message) => {
    const sentAt = new Date(message.sentAt).getTime();
    if (sentAt >= start && sentAt < end) {
      // Un element par heure -> On peut utiliser le Math.floor pour trouver la bonne "case horaire"
      const index = Math.floor((sentAt - start) / ONE_HOUR);
      result[index].messagesCount++;
    }
  });

  return result;
}

// used interfaces, do not touch
export interface Message {
  content: string;
  sentBy: string;
  sentAt: string;
  message: string;
}

export interface MessageStatsSlot {
  fromDatetime: string;
  toDatetime: string;
  messagesCount: number;
}
