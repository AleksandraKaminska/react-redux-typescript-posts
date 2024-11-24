import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Heading, Input, Textarea } from "@/components/ui"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as zod from "zod"

import { Form } from "@/components/common/form"
import { useNavigate } from "react-router-dom"
import { createPost } from "@/redux/posts/postsSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"

const CreatePostSchema = zod.object({
  title: zod.string().min(1),
  body: zod.string().min(1),
  userId: zod.number(),
})

export const CreatePostForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isPending, error } = useSelector((state: RootState) => state.posts)

  const form = useForm<zod.infer<typeof CreatePostSchema>>({
    defaultValues: {
      title: "",
      body: "",
      userId: 1,
    },
    resolver: zodResolver(CreatePostSchema),
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    dispatch(createPost(data))
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
        <div className="flex items-center justify-end gap-x-2">
          <Button
            size="small"
            variant="primary"
            type="submit"
            isLoading={isPending}
          >
            {t("actions.create")}
          </Button>
        </div>
        <div className="flex h-full flex-col items-center p-16">
          <div className="flex w-full max-w-[720px] flex-col gap-y-8">
            <Heading>{t("posts.createPost")}</Heading>
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
          </div>
        </div>
      </form>
    </Form>
  )
}
