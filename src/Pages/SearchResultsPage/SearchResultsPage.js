import React from 'react'
import videos from "../../MOCK_DATA.json";
import { SearchResults } from './Components/SearchResults';

export function SearchResultsPage() {
  return (
    <section>
      {videos.videos.map((video, i) => {
        return (
          <SearchResults key={i} video={video} />
        )
      })}
    </section>
  )
}
