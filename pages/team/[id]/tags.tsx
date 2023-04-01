import { useRouter } from "next/router";
import Button from "../../../components/button";
import Tag from "../../../components/tag";
import { useTags } from "../../../helpers/use-tags";
import { useState } from "react";

export const Tags = () => {
  const router = useRouter();
  const { tags, teamName, isLoading, isError } = useTags(router.query.id);
  const [editMode, setEditMode] = useState<boolean>();

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

      <h2 className="mb-4">Tags</h2>
      <div className="flex">
        <div className="flex-1">
          {tags.map((t) => (
            <Tag text={t.id} color={t.metadata.color} className="w-1/4" />
          ))}
        </div>
        <div>
          {!editMode && (
            <Button className="mb-2" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tags;
