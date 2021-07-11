import React from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../slices/posts/thunks";
import postsSelectors from "../../slices/posts/selectors";
import AddPosts from "./components/AddPosts";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import usePostsHandler from "../../hooks/usePostsHandler";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelectors.selectAll);

  const postState = useSelector((state) => state.posts.loading);

  const openToast = useToast();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id)).then(() =>
        openToast({
          status: "success",
          title: "Post deleted successfully",
          description: "Your post was successfully deleted",
        })
      );
    }
  };

  const [currentlyEditingPost, setCurrentlyEditingPost] = React.useState(null);
  const handleEdit = (id) => {
    setCurrentlyEditingPost(id);
  };

  usePostsHandler();

  if (postState === "idle") {
    return <Spinner size="xl" />;
  }

  return (
    <Box>
      <AddPosts id={currentlyEditingPost} setId={setCurrentlyEditingPost} />
      {posts.map(({ id, body, title }) => {
        return (
          <Flex
            key={id}
            padding="1.2rem"
            margin="1.2rem"
            border="1px solid black"
            borderRadius="6px"
            position="relative"
          >
            <Box position="absolute" top="1rem" right="1rem">
              <IconButton
                onClick={() => handleDelete(id)}
                aria-label="Delete Post"
                icon={<DeleteIcon />}
              />
              <IconButton
                onClick={() => handleEdit(id)}
                ml="1.2rem"
                aria-label="Delete Post"
                icon={<EditIcon />}
              />
            </Box>
            <Box>{title}</Box>
            <Box>{body}</Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default Posts;
