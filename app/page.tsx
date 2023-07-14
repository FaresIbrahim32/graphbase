import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}

type Props = {
  searchParams: SearchParams
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  },
}

const Home = ({ searchParams: { category, endcursor } }: Props) => {
  const fetchData = async () => {
    try {
      const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
      return data?.projectSearch;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  };

  const projectsToDisplay = fetchData()?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    )
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>
      <LoadMore 
        startCursor={fetchData()?.pageInfo?.startCursor} 
        endCursor={fetchData()?.pageInfo?.endCursor} 
        hasPreviousPage={fetchData()?.pageInfo?.hasPreviousPage} 
        hasNextPage={fetchData()?.pageInfo?.hasNextPage}
      />
    </section>
  )
};

export default Home;
