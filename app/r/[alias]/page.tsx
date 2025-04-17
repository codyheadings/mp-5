import {redirect} from "next/navigation";
import getCollection, {ALIAS_COLLECTION} from "@/db";

export default async function RedirectUrlPage({params}:{params: Promise<{alias: string}>}) {
    const {alias} = await params;

    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const data = await aliasCollection.findOne({ alias: alias });
    if(data===null){
        console.error("Failed to find alias");
        return redirect("/");
    } else {
        return redirect(data.url);
    }
}