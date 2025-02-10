/**
 * In this challenge, you must find and attach to each ad the ad (or ads)
 * with which the current ad has the most tags in common. This algo will
 * be very useful to get similar products of a given product.
 * Attached ads must be sorted by their title (A to Z).
 * You must not change the order of the main list of ads.
 *
 * @param ads List of ads without closestAds
 * @returns The same list but with a new closestAds prop on each
 */

// ↓ uncomment bellow lines and add your response!

export default function ({
  ads,
}: {
  ads: AdWithTags[];
}): AdWithTagsAndClosestAds[] {
  return ads.map((ad) => {
    const maxCommonTags = ads.reduce((acc, elt) => {
      const commonTags = ad.tags.filter((tag) => {
        return elt.tags.includes(tag) && elt.title !== ad.title;
      });
      return Math.max(commonTags.length, acc);
    }, 0);

    const closestAds = ads
      .filter((elt) => {
        const commonTags = ad.tags.filter((tag) => {
          return elt.tags.includes(tag) && elt.title !== ad.title;
        });
        if (!commonTags.length) return false;
        return commonTags.length === maxCommonTags;
      })
      .sort((ad1, ad2) => {
        if (ad1.title < ad2.title) return -1;
        return 1;
      });

    return { ...ad, closestAds };
  });

  // Definir le retour: un tableau d'Ads auxquelles on a ajouté une clé closestAds
  //  -> ads.map return { ...ad, closestAds: [] }
  //  => on travaille avec un seul element "ad"
  // Calculer le nombre max de tags en commun avec ad (maxCommonTags)
  //  -> ad.reduce (on garde le plus grand nombre de tags en commun d'une ad dans le tableau)
  //  -> créer une fonction pour calculer l'intersection de deux tableaux
  // Garder les annonces dont le nombre de tags en commun avec ad est de maxComonTags
  //  -> ad.filter
  // Ordonner les annonces proches par titre
  //  -> sort
  // Gérer cas particuliers
  //  - dedoublonnage des annonces candidates (x2)
  //  - CommonTags=0
}

// used interfaces, do not touch
export interface AdWithTags {
  title: string;
  price: number;
  tags: string[];
}

export interface AdWithTagsAndClosestAds extends AdWithTags {
  closestAds: AdWithTags[];
}

// const arr = ["one", "two", "three"];
//nombre de lettres total

// const nb = arr.reduce((acc, word) => {
//   const nbLetters = word.length;
//   return acc + nbLetters;
// }, 0);
