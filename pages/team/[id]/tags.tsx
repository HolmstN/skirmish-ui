import { useRouter } from "next/router";
import Button from "../../../components/button";
import Tag from "../../../components/tag";
import { useTags } from "../../../helpers/use-tags";

export const Tags = () => {
  const router = useRouter();
  const { tags, teamName, isLoading, isError } = useTags(router.query.id);

  const addTag = () => {
    // TODO
  };

  if (isLoading) {
    return <div>Is Loading...</div>;
  }

  if (isError || !tags) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="text-center">
        <h1>{teamName}</h1>
      </div>
      <div className="flex justify-end border-b">
        <Button className="mb-2" onClick={addTag}>
          Add New Tag
        </Button>
      </div>

      <div>
        <h2 className="mb-4">Tags</h2>
        {tags.map((t) => (
          <Tag text={t.id} color={t.metadata.color} />
        ))}
      </div>
    </div>
  );
};

export default Tags;
