"use server";

import getCollection, {ALIAS_COLLECTION} from "@/db";
import {AliasProps} from "@/types";

function isValidUrl(url: string): boolean {
    return url.slice(0,5) === 'http:' || url.slice(0,6) === 'https:';
}

export default async function createNewAlias(
    alias: string,
    url: string,
): Promise<{success: boolean; data?: AliasProps; error?: string}> {
    console.log("Creating new alias url...");

    if (!isValidUrl(url)) {
        return {
            success: false,
            error: "A valid URL must begin with http:// or https://"
        };
    }

    try {
        const response = await fetch(url, {
            method: "HEAD",
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