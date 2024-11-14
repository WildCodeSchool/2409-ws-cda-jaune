import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Ad } from "../entities/Ad";
import type {  Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { In } from "typeorm";

@InputType()
class AdInput {
	@Field()
	title!: string;
	
	@Field()
	description?: string;

	@Field()
	owner!: string;

	@Field()
	price!: number;

	@Field()
	picture!: string;

	@Field()
	location!: string;

	@Field(()=>ID)
	category!: Category;

	@Field(()=>[ID])
	tags!: Tag[];
}

@Resolver(Ad)
export class AdResolver {
	@Query(() => [Ad])
	async getAds() {
		const ads = await Ad.find({relations:["category", "tags"]})
		return ads;
	}
	
	@Query(() => Ad)
	async getAdById( @Arg("adId") id: string) {
		const ad = await Ad.findOneOrFail({
			where:{id}, 
			relations:["category", "tags"]
		})
		return ad;
	}
	
	@Mutation(() => Ad)
	async createAd(@Arg("data") data: AdInput) {
		let ad = new Ad()
		ad = Object.assign(ad, data);
		const tags =await Tag.findBy({id: In(data.tags)})
		ad.tags = tags
		console.log(ad);
		
		await ad.save()
		return ad;
	}

	@Mutation(() => Boolean)
	async deleteAdById( @Arg("adId") id: string) {
		return (await Ad.delete({id})).affected

		//@Elie > "Plus complet mais plus lent" (gère les relations)
		// const ad = await Ad.findOneByOrFail({id})
		// ad.remove()
		// return true;
	}

	@Mutation(() => Ad)
	async replaceAdById( @Arg("adId") id: string, @Arg("data") data:AdInput ) {
		let ad = await Ad.findOneByOrFail({id})
		ad = Object.assign(ad, data);
		const tags =await Tag.findBy({id: In(data.tags)})
		ad.tags = tags
		await ad.save()
		return ad;
	}
}
