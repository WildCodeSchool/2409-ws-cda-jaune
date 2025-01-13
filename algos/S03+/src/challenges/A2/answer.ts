/**
 * In this challenge, you have to add a list of tags to each category (based on
 * ad tags in the category). Duplicate tags for one category is not permitted. Tags
 * must me sorted alphabatically. Categories order, ads order and ads tags order must remain
 * untouched.
 *
 * @param categories List of categories without tags, but with ads
 * @returns List of categories with a new prop tags
 */

// ↓ uncomment bellow lines and add your response!
export default function ({
  categories,
}: {
  categories: Category[];
}): CategoryWithTags[] {
  return categories.map((category)=>{
    let myTags:string[] = []
    // category.ads.map((ad)=>{
    //   myTags = [...myTags, ...ad.tags]
    // })
    for(let i=0; i<category.ads.length;i++) {
      myTags = [...myTags, ...category.ads[i].tags]
    }

    // myTags = myTags.sort((tagA, tagB)=>{
    //   if(tagA<tagB) return -1
    //   return 1
    // })
    myTags = myTags.sort()
    return {...category, tags:Array.from(new Set(myTags))}
  })
}

// used interfaces, do not touch
interface Ad {
  title: string;
  price: number;
  tags: string[];
}

export interface Category {
  ads: Ad[];
  name: string;
}

export interface CategoryWithTags extends Category {
  tags: string[];
}
