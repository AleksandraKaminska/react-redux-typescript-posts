import { Container, Heading } from "@/components/ui"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { client } from "@/lib/client"
import { useEffect, useState } from "react"
import { PostRes } from "@/types"
import { EditPostForm } from "./components/edit-post-form"

export const PostEdit = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [post, setPost] = useState<PostRes | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    client.posts
      .retrieve(parseInt(id!))
      .then(setPost)
      .catch((error: Error) => setError(error))
      .finally(() => setIsLoading(false))
  }, [id])

  if (error) {
    throw error
  }

  return (
    <Container className="size-full">
      {!isLoading && post && <EditPostForm post={post} />}
    </Container>
  )
}
