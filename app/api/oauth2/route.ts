import { NextResponse } from 'next/server';
import axios from 'axios';
import { handleAxiosClient } from '../axiosClient';

export async function GET(req: Request){
  try {
    const res =await handleAxiosClient.get(`bx/oauth2_token/${process.env.APP_ID}`)
    return NextResponse.json(res.data)
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}