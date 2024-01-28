export interface SummaryResponse {
  summary: string;
  title: string;
  author: string;
  publication_date: string;
  translated_summary: string;
  sentiment: {
    polarity: number;
    sentiment: string;
  };
}
