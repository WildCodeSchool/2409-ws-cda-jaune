/**
 * In this challenge, you have to regroup ads by the month they got created.
 * The result should be an array containing one object for each month. These objects
 * must be sorted chronoligically (oldest first) based on their month property (ISO8601 datetime).
 * Please note that the date of a month will be the first day of this month at midnigth (ISO8601)
 * For instance, the datetime of novembre is: "2023-11-01T00:00:00.000Z"
 *
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ...
 * instead of setHouts, setMinutes, ... to avoid timezone offsets!
 *
 * @param ads A list of ads with their title and created datetime
 * @returns A list of objects. Each object must contain a month and its associated ads. The list must be sorted chronoligically
 */

// ↓ uncomment bellow lines and add your response!
export default function ({ ads }: { ads: Ad[] }): MonthAds[] {
  // Reduce: "à partir d'un tableau, crée moi une valeur"
  const monthAdsMap = ads.reduce((acc, ad) => {
    const date = new Date(ad.createdAt);
    date.setUTCDate(1);
    date.setUTCHours(0, 0, 0, 0);
    const month = date.toISOString();

    // Etat:
    // - date contient un Date correspondant au début du mois de l'annonce
    // - month contient une string correspondant au début du mois de l'annonce

    let monthAds = acc.find((ma) => ma.month === month);

    // Si première annonce de ce mois: creer la structure dans acc
    if (!monthAds) {
      monthAds = { month, ads: [] };
      // Etat loop0:
      // - monthAds contient: { month: "2023-11-01T00:00:00.000Z", ads:[]}
      acc.push(monthAds);
    }

    monthAds.ads.push(ad);

    return acc;
  }, [] as MonthAds[]);

  monthAdsMap.sort(
    (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
  );

  return monthAdsMap;
}

// used interfaces, do not touch
export interface Ad {
  title: string;
  createdAt: string;
}

export interface MonthAds {
  month: string;
  ads: Ad[];
}
