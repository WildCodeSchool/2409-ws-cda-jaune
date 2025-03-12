/**
 * In this challenge, you have to regroup messages into an array of day based on their
 * sentAt property, messages in a day must be sorted by their sent at prop (oldest first)
 * The main array must be sort chronologically by their day dates (oldest first)
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ...
 * instead of setHours, setMinutes, ... to avoid timezone offsets!
 *
 * @param messages List of messages, unsorted and not grouped in days
 * @returns Sorted list of days (only days with messages!) with a list of sorted messages of the day
 */

// ↓ uncomment bellow lines and add your response!
export default function ({ messages }: { messages: Message[] }): DayMessages[] {
  /* 1ere implementation: reduce, array.find */
  //créer daysWithMessages: chaque message va dans un objet kivabien
  const daysWithMessages = messages.reduce((acc, msg) => {
    //calculer date ISO du message
    const date = new Date(msg.sentAt);
    date.setUTCHours(0, 0, 0, 0);
    const dayIsoString = date.toISOString();

    //verifier si des messages ont ete postes sur le meme jour
    let dayMessages = acc.find(
      (accCandidate) => accCandidate.day === dayIsoString
    );

    //optionnel: premier message de ce jour ?
    if (!dayMessages) {
      dayMessages = { day: "", messages: [] };
    }
    //-> j'ai *forcement* une structure pour le jour de mon message

    //push mon message dans sa structure
    dayMessages.messages.push(msg);

    return acc;
  }, [] as DayMessages[]);

  daysWithMessages.sort((dmA, dmB) => {
    if (dmA.day < dmB.day) {
      return -1;
    } else {
      return 1;
    }
  });

  daysWithMessages.forEach((dayMessages) => {
    dayMessages.messages.sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    );
  });

  return daysWithMessages;
  /* */

  /* 2nde implementation: map.get (Merci Nicolas !)
  const byDays = messages.reduce((acc, msg) => {
    const day = msg.sentAt.split('T')[0] + 'T00:00:00.000Z';
    if (!acc.has(day)) acc.set(day, []);
    acc.get(day)?.push(msg);
    return acc;
  }, new Map<string, Message[]>());

  return Array.from(byDays)
    .map(([day, messages]) => ({
      day,
      messages : messages.sort((a, b) => a.sentAt.localeCompare(b.sentAt))
    }))
    .sort((a, b) => a.day.localeCompare(b.day));
  */
}

// used interfaces, do not touch
export interface Message {
  content: string;
  sentBy: string;
  sentAt: string;
  message: string;
}

export interface DayMessages {
  day: string;
  messages: Message[];
}
