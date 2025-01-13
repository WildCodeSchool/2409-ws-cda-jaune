/**
 * In this challenge, you have to get all the images sent in a conversation (list of messages).
 * Images must be sorted by message datetime they are attached to (recents first, if datetimes are the same, should be sorted by content length).
 * You should not display duplicates. If duplicates are found, the recent one should be kept.
 * This algo is useful to create a medias gallery in a conversation app (such as in WhatsApp conversations)
 *
 * @param messages List of messages with their images
 * @returns All existing images sorted by their parent datetimes (recent first), without duplicates
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  messages,
}: {
  messages: MessageWithImages[];
}): string[] {
  //return []

  // Init tableau d'img []: myPics
  let myPics: string[] = [];
  // Trier messages selon datetime, puis contenu.length
  let myMessages = messages.sort((msgA, msgB)=>{
    if(msgA.sentAt<msgB.sentAt)
      return -1;
    if(msgA.sentAt>msgB.sentAt)
      return 1;

    return msgA.content.length-msgB.content.length
  })
  // Pour chaque msg
  for(let i=0; i<myMessages.length;i++) {
    // myPics = [...myPics, ...msg.images]
    myPics = [...myPics, ...myMessages[i].images]
  }
  // dedoublonner myPics
  // myPics = Array.from(new Set(myPics))
  myPics = [...new Set(myPics)]
  // Return myPics
  return myPics

}

// used interfaces, do not touch
export interface MessageWithImages {
  sentBy: string;
  content: string;
  images: string[];
  sentAt: string;
}
