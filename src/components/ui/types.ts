// Toast types

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export type ToastVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "loading"
  | "message"

export type ToastActionVariant = "default" | "destructive"

export interface ToastAction {
  /**
   * The button's text.
   */
  label: string
  /**
   * The button's alt text.
   */
  altText: string
  /**
   * The function to execute when the button is clicked.
   */
  onClick: () => void | Promise<void>
  /**
   * The button's variant.
   */
  variant?: ToastActionVariant
}
