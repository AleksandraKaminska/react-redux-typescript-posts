import { Heading, Text, clx } from "@/components/ui"
import { CSSProperties, ComponentPropsWithoutRef } from "react"

interface SkeletonProps {
  className?: string
  style?: CSSProperties
}

export const Skeleton = ({ className, style }: SkeletonProps) => {
  return (
    <div
      aria-hidden
      className={clx(
        "h-full w-full animate-pulse rounded-[4px] bg-ui-bg-component",
        className
      )}
      style={style}
    />
  )
}

interface TextSkeletonProps {
  size?: ComponentPropsWithoutRef<typeof Text>["size"]
  leading?: ComponentPropsWithoutRef<typeof Text>["leading"]
  characters?: number
}

interface HeadingSkeletonProps {
  level?: ComponentPropsWithoutRef<typeof Heading>["level"]
  characters?: number
}

export const HeadingSkeleton = ({
  level = "h1",
  characters = 10,
}: HeadingSkeletonProps) => {
  let charWidth = 9

  switch (level) {
    case "h1":
      charWidth = 11
      break
    case "h2":
      charWidth = 10
      break
    case "h3":
      charWidth = 9
      break
  }

  return (
    <Skeleton
      className={clx({
        "h-7": level === "h1",
        "h-6": level === "h2",
        "h-5": level === "h3",
      })}
      style={{
        width: `${charWidth * characters}px`,
      }}
    />
  )
}

export const TextSkeleton = ({
  size = "small",
  leading = "compact",
  characters = 10,
}: TextSkeletonProps) => {
  let charWidth = 9

  switch (size) {
    case "xlarge":
      charWidth = 13
      break
    case "large":
      charWidth = 11
      break
    case "base":
      charWidth = 10
      break
    case "small":
      charWidth = 9
      break
    case "xsmall":
      charWidth = 8
      break
  }

  return (
    <Skeleton
      className={clx({
        "h-5": size === "xsmall",
        "h-6": size === "small",
        "h-7": size === "base",
        "h-8": size === "xlarge",
        "!h-5": leading === "compact",
      })}
      style={{
        width: `${charWidth * characters}px`,
      }}
    />
  )
}

export const IconButtonSkeleton = () => {
  return <Skeleton className="h-7 w-7 rounded-md" />
}
