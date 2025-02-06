import { RaasClient, RelevanceResponseType } from '@rvohealth/raas-client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { searchQuery } = await req.json()

    const raasClient = new RaasClient()

    const articles = await raasClient.relevanceFromSearch({
      relevantContext: {
        searchQuery,
      },
      overrideResponseTypes: [RelevanceResponseType.Articles],
    })

    return NextResponse.json(articles)
  } catch (error: any) {
    console.error('Error in /chat/completions:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
