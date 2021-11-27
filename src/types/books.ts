export interface Book {
  id: string | number
  volumeInfo: {
    title: string
    authors: string[]
    description: string
    categories: string[]
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
  }
}

