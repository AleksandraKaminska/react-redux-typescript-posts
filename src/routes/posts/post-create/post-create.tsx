import { Container } from "@/components/ui"
import { CreatePostForm } from "./components/create-post-form"

export const PostCreate = () => {
  return (
    <Container className="size-full">
      <CreatePostForm />
    </Container>
  )
}
