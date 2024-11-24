import { Button, Container, Heading, InfoBox } from "@/components/ui"
import { deletePost, fetchPosts } from "@/redux/posts/postsSlice"
import { AppDispatch, RootState } from "@/store"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const PostList = () => {
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
      <div className="flex items-center justify-between py-4">
        <Heading>{t("posts.domain")}</Heading>
        <Link to="/posts/create">
          <Button size="small" variant="secondary">
            {t("actions.create")}
          </Button>
        </Link>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <InfoBox label={post.title} description={post.body}>
              <div className="mt-2 flex gap-2">
                <Link to={`/posts/${post.id}/edit`}>
                  <Button variant="secondary">{t("actions.edit")}</Button>
                </Link>
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
