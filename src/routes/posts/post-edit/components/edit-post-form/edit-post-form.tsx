import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Heading, Input, Textarea } from "@/components/ui"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as zod from "zod"

import { Form } from "@/components/common/form"
import { Link, useNavigate } from "react-router-dom"
import { updatePost } from "@/redux/posts/postsSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { PostRes } from "@/types"

interface EditPostFormProps {
  post: PostRes
}

const UpdatePostSchema = zod.object({
  id: zod.number(),
  title: zod.string().min(1),
  body: zod.string().min(1),
  userId: zod.number(),
})

export const EditPostForm = ({ post }: EditPostFormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isPending, error } = useSelector((state: RootState) => state.posts)

  const form = useForm<zod.infer<typeof UpdatePostSchema>>({
    defaultValues: {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    },
    resolver: zodResolver(UpdatePostSchema),
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    dispatch(updatePost(data))
    navigate("/")
  })

  if (error) {
    throw error
  }

  return (
    <Form {...form}>
      <form
        className="relative flex size-full flex-col justify-between gap-8"
        onSubmit={handleSubmit}
      >
        <div className="flex h-full flex-col items-center p-16">
          <div className="flex w-full max-w-[720px] flex-col gap-y-8">
            <Heading>{t("posts.editPost")}</Heading>
            <div className="flex flex-col gap-4">
              <Form.Field
                control={form.control}
                name="title"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>{t("fields.title")}</Form.Label>
                    <Form.Control>
                      <Input autoComplete="off" {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )}
              />
              <Form.Field
                control={form.control}
                name="body"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>{t("fields.body")}</Form.Label>
                    <Form.Control>
                      <Textarea {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Link to="/">
                <Button variant="secondary">{t("actions.cancel")}</Button>
              </Link>
              <Button type="submit" isLoading={isPending}>
                {t("actions.save")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
