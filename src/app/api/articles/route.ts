import { NextResponse } from 'next/server';
import articles from '../../../../resources/articles.json';

export function GET() {
  return NextResponse.json(articles);
}
