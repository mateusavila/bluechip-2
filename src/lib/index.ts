import * as prismic from "@prismicio/client"

export const routes = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "join_the_team",
    path: "/join-the-team",
  },
  {
    type: "contact_us",
    path: "/contact-us",
  },
]
export const loadContent = async (page: string) => {
  const repoName = 'bluechip'
  const endpoint = prismic.getEndpoint(repoName)
  const client = prismic.createClient(endpoint)
  return await client.getSingle(page)
}
