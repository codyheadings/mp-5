"use server";

import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";


export default async function createNewAlias(
    alias: string,
    url: string,
): Promise<{success: boolean; data?: AliasProps; error?: string}> {
    console.log("Creating new alias url...");

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        if(!response.ok){
            return {success: false, error: `URL returned status ${response.status}. Please check your URL and try again.`};
        }
    } catch (error) {
        console.error(error);
    }

    const document = {
        alias: alias,
        url: url,
    }

    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    if(await aliasCollection.findOne({alias: alias})) {
        return { success: false, error: "This alias is already taken. Please choose another." };
    }
    const res = await aliasCollection.insertOne(document);

    if(!res.acknowledged) {
        return { success: false, error: "Failed to insert new alias URL" };
    }

    return {success: true,
        data: {alias: alias, url: url}};
}