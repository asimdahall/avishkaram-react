import React from "react";
import { Box, Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../../slices/posts/thunks";
import postsSelectors from "../../../slices/posts/selectors";

const AddPosts = ({ id, setId }) => {
  const isEditing = !!id;
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    title: "",
    body: "",
  });

  const currentPost = useSelector((state) =>
    postsSelectors.selectById(state, id)
  );

  React.useEffect(() => {
    if (id) {
      setFormValues(currentPost);
    }
  }, [id, currentPost]);

  const openToast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const thunkAPI = isEditing ? updatePost : addPost;
    dispatch(thunkAPI(formValues))
      .then(() => {
        setId(null);
        openToast({
          status: "success",
          title: "Success",
          description: `Post ${isEditing ? "updated" : "added"} successfully`,
        });
        setFormValues({
          title: "",
          body: "",
        });
      })
      .catch(() => {
        openToast({
          status: "error",
          title: "Something went wrong",
          description: "Something went wrong while submitting the data",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <Box
      as="form"
      display="flex"
      width="100%"
      flexDirection="column"
      alignItems="center"
      onSubmit={handleSubmit}
    >
      <Box w="30rem">
        <Input
          value={formValues.title}
          onChange={(e) => {
            setFormValues((formValues) => ({
              ...formValues,
              title: e.target.value,
            }));
          }}
          name="title"
          variant="flushed"
          placeholder="Title"
        />
        <Input
          value={formValues.body}
          name="body"
          variant="flushed"
          placeholder="Body"
          onChange={(e) => {
            setFormValues((formValues) => ({
              ...formValues,
              body: e.target.value,
            }));
          }}
        />
        <Button disabled={isSubmitting} type="submit" w="100%" mt="1.2rem">
          {isSubmitting && <Spinner size="sm" />} &nbsp;
          {isEditing ? "Update" : "Add"} Post
        </Button>
      </Box>
    </Box>
  );
};

export default AddPosts;
