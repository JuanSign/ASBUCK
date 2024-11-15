import IdeaCard from "@/components/IdeaCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: 'meli' },
    _id: 1,
    description: 'this is a description',
    image: "https://cdn.britannica.com/16/254816-050-41C9577A/Google-logo-Googleplex-headquarters-Mountain-View-California.jpg?w=385",
    category: "Robots",
    title: "We Robots"
  }]
  return (
    <>
      <section className="grey_container">
        <h1 className="heading">CODE, COMMIT, CONQUER!</h1>
        <p className="sub-heading !max-w-3xl">New Era, New Problems, New Solutions</p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Best idea about "${query}"` : "All Ideas"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: any) => (<IdeaCard key={post?._id} post={post} />))
          ) : (<p className="no-results">No idea found...</p>)}
        </ul>
      </section>
    </>
  );
}
