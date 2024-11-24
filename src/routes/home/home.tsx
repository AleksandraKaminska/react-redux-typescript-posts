import { Button, Container, Heading, InfoBox } from "@/components/ui"
import { deletePost, fetchPosts } from "@/features/posts/postsSlice"
import { AppDispatch, RootState } from "@/store"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

export const Home = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.posts
  )

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleDelete = (postId: number) => {
    dispatch(deletePost(postId))
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="animate-spin text-ui-fg-interactive" />
      </div>
    )
  }

  if (error) {
    throw error
  }

  return (
    <Container>
      <Heading>{t("general.posts")}</Heading>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <InfoBox label={post.title} description={post.body}>
              <div className="mt-2 flex gap-2">
                <Button variant="secondary">{t("actions.edit")}</Button>
                <Button variant="danger" onClick={() => handleDelete(post.id)}>
                  {t("actions.delete")}
                </Button>
              </div>
            </InfoBox>
          </li>
        ))}
      </ul>
    </Container>
  )
}
