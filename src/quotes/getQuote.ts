import axios from 'axios';

/**
 * A single quote API response.
 */
interface IQuoteDto {
    quote: string;
    length: string;
    tags: string[];
    category: string;
    language: string;
    date: string;
    permalink: string;
    id: string;
    background: string;
    title: string;
}

/**
 * A full API response DTO.
 */
interface IQuotesApiResponseDto {
    contents: {
        quotes: IQuoteDto[]
    },
    baseurl: string;
    copyright: {
        year: number;
        url: string;
    }
}

/**
 * Parses a response DTO into a quote.
 */
function parseQuoteFromResponse(dto: IQuotesApiResponseDto): string | Error {
    return dto.contents.quotes.length > 0
        ? dto.contents.quotes[0].quote
        : new Error('Could not parse quote');
}

/**
 * Returns a random quote of the day
 */
export async function getRandomQuote(): Promise<string> {
    const response = await axios.get<IQuotesApiResponseDto>('http://quotes.rest/qod');
    const dto = response.data;

    const result = parseQuoteFromResponse(dto);
    return result instanceof Error
        ? Promise.reject(result)
        : Promise.resolve(result);
}