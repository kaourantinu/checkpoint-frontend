// you can put your types here
export type Country = {
  id: string
  code: string
  continent: {
    name: string
  }
  emoji: string
  name: string
}

export type Continent = {
  id: string
  name: string
}