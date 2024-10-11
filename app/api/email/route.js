import { ConnectDb } from "@/lib/congif/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async ()=>{
    ConnectDb();
}

LoadDB();
export async function POST(request){
    const formData = await request.formData();
    const emailData = {
        email:`${formData.get('email')}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({
        success:true,
        msg:"Email Added"
    })
}

export async function GET(request){
    const emails = await EmailModel.find({});
    return NextResponse.json({emails})

}
export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id')
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({
        msg:"Email Deleted"
    })
}