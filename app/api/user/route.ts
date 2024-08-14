import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { intranetAxiosClient } from '../axiosClient';

export async function GET(req: NextRequest){
  try {
    const auth = req.nextUrl.searchParams.get('auth');
    if(!auth){
        return NextResponse.json({ message: 'Token is required' })
    }
    const res = await intranetAxiosClient.get(`rest/user.get.json?auth=${auth}`)
    return NextResponse.json(res.data)
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}