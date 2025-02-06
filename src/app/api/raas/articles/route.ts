import { RaasClient, RelevanceResponseType } from '@rvohealth/raas-client'
import { NextResponse } from 'next/server'
import { MedicalInfoType } from '@/types/medical-info'
export async function POST(req: Request) {
  try {
    const { searchQuery } = await req.json()

    const raasClient = new RaasClient()

    const articles = await raasClient.relevanceFromSearch({
      relevantContext: {
        searchQuery,
      },

      overrideResponseTypes: [
        RelevanceResponseType.Articles,
        RelevanceResponseType.Providers,
      ],
    })

    // Map the articles to MedicalInfo format
    const mappedArticles =
      articles?.articleResult?.data?.items?.map((article) => ({
        id: article?.id,
        type: 'article' as MedicalInfoType,
        title: article?.title,
        content: article?.description,
        timestamp: new Date(article?.cmsPublishDate || ''),
        doctorId: '', // No doctor info in article data
        doctorName: '', // No doctor info in article data
        severity: 'low', // Default severity
        metadata: {
          articleUrl: article?.url,
          articleSource: article?.site,
          tags: article?.topicTags || [],
        },
      })) || []

    const apiResponse = await fetch('http://localhost:4000/api/medical-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(mappedArticles), // Sending first article for now
    })

    await apiResponse.json()

    return NextResponse.json(articles)
  } catch (error: any) {
    console.error('Error in /chat/completions:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
