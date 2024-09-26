import "reflect-metadata";
import express from "express";
import sqlite3 from "sqlite3";
import { dataSource } from "./config/db";
import { Ad } from "./entities/Ad";

const db = new sqlite3.Database("./the-good-corner.sqlite");

const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/ads", async (req, res) => {
	try {
		const ads = await Ad.find();
		if (!ads.length) return res.status(404).send("No Ads found");
		return res.json(ads);
	} catch (err) {
		return res.status(500).send(err);
	}
});

app.get("/ads/:id", async (req, res) => {
	const id = Number(req.params.id);
	try {
		const ad = await Ad.findOneBy({ id });
		if (!ad) return res.status(404).send("Ad not found");
		return res.json(ad);
	} catch (err) {
		return res.status(500).send(err);
	}
});

app.delete("/ads/:id", async (req, res) => {
	const id = Number(req.params.id);
	try {
		const ad = await Ad.findOneBy({ id });
		if (!ad) return res.status(404).send("Ad not found");
		ad.remove();
		return res.status(204).send();
	} catch (err) {
		return res.status(500).send(err);
	}
});

app.post("/ads", (req, res) => {
	const { title, description, owner, price, createdAt, picture, location } =
		req.body;
	try {
		const ad = new Ad();
		ad.title = title;
		ad.description = description;
		ad.owner = owner;
		ad.price = price;
		ad.createdAt = createdAt;
		ad.picture = picture;
		ad.location = location;
		ad.save();
		return res.status(201).send();
	} catch (err) {
		return res.status(500).send(err);
	}
});

app.listen(port, async () => {
	await dataSource.initialize();
	console.log(`Example app listening on port ${port}`);
});
