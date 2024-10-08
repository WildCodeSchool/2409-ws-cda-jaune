import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Category } from "../types/Category";
import Select from 'react-select'

export default function AdCreationForm() {
    const [categories, setCategories]=useState<Category[]>([])
    const [tags, setTags]=useState([])

      async function fetchCategories() {
        const {data} = await axios.get<Category[]>("http://localhost:3000/categories")
        setCategories(data)
    }
    async function fetchTags() {
        let {data} = await axios.get("http://localhost:3000/tags")
        type ApiTag = {
            id:number,
            name:string
        }
        data = data.map((apiTag:ApiTag)=>({value:apiTag.id, label: apiTag.name}))
        setTags(data)
    }
    

    useEffect( ()=>{
        fetchCategories()
        fetchTags()
    }, [] )

    const hSubmit = (evt: FormEvent)=>{
        evt.preventDefault()
        
        const form = evt.target;
        const formData = new FormData(form as HTMLFormElement)
        const formJson = Object.fromEntries(formData.entries())

        console.log(formJson);
        
        axios.post("http://localhost:3000/ads", formJson)
    }


    return (
        <main className="main-content">
    <form onSubmit={hSubmit}>
        <label>
            Titre:
            <input className="text-field" name="title" />
        </label>
        <label>
            Description:
            <input className="text-field" name="description" />
        </label>
        <label>
        Owner:
            <input className="text-field" name="owner" />
        </label>
        <label>
        Price:
            <input className="text-field" name="price" />
        </label>
        <label>
        Picture:
            <input className="text-field" name="picture" />
        </label>
        <label>
        Location:
            <input className="text-field" name="location" />
        </label>
        <select name="categoryId">
        {
            categories.map((category)=><option key={category.id} value={category.id}>{category.name}</option>)
        }
        </select>
        <label>
            Tags:
            <Select options={tags} isMulti name="tagsIds" delimiter="," />
        </label>
        <button className="button">Create Ad!</button>
    </form>
        </main>
    )
}