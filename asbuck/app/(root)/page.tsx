import IdeaCard, { IdeaTypeCard } from "@/components/IdeaCard";
import SearchForm from "../../components/SearchForm";
import { IDEAS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();

  const { data: posts } = await sanityFetch({ query: IDEAS_QUERY, params });

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
            posts.map((post: IdeaTypeCard) => (<IdeaCard key={post?._id} post={post} />))
          ) : (<p className="no-results">No idea found...</p>)}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
