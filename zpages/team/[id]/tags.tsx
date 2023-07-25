import { useRouter } from "next/router";
import Button from "../../../components/button";
import Tag from "../../../components/tag";
import { useTags } from "../../../helpers/use-tags";
import { useState } from "react";
import Layout, { LayoutHeader, LayoutMain } from "../../../components/layout";

export const Tags = () => {
  const router = useRouter();
  const { tags, teamName, isLoading, isError } = useTags(router.query.id);
  const [editMode, setEditMode] = useState<boolean>();

  const addTag = () => {
    // TODO
  };

  if (isLoading) {
    return (
      <Layout>
        <LayoutHeader>
          <h1>Tags - {teamName}</h1>
        </LayoutHeader>
        <LayoutMain>Is Loading...</LayoutMain>
      </Layout>
    );
  }

  if (isError || !tags) {
    return (
      <Layout>
        <LayoutHeader>
          <h1>Tags - {teamName}</h1>
        </LayoutHeader>
        <LayoutMain>Error</LayoutMain>
      </Layout>
    );
  }

  return (
    <Layout>
      <LayoutHeader>
        <h1>Tags - {teamName}</h1>
      </LayoutHeader>

      <LayoutMain>
        <div className="flex items-center">
          <div className="flex-1">
            {tags.map((t) => (
              <Tag text={t.id} color={t.metadata.color} className="mx-1" />
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button className="mb-2" onClick={addTag}>
              Add New Tag
            </Button>
            {!editMode && (
              <Button className="mb-2" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>
      </LayoutMain>
    </Layout>
  );
};

export default Tags;
