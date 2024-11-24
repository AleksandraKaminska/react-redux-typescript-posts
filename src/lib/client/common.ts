import { BASE_URL } from "@/utils/constants"
import { stringify } from "qs"

const commonHeaders = async (): Promise<HeadersInit> => {
  return {
    "Content-Type": "application/json",
  }
}

export function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? stringify(query) : null
  return `${BASE_URL}${path}${params ? `?${params}` : ""}`
}

function getBody(payload?: Record<string, any>) {
  return payload ? JSON.stringify(payload) : undefined
}

async function getOptions(
  options?: Omit<RequestInit, "body">,
  payload?: Record<string, any>
): Promise<RequestInit> {
  const body = getBody(payload)

  return {
    ...options,
    headers: {
      ...(await commonHeaders()),
      ...options?.headers,
    },
    body,
  }
}

async function makeRequest<
  TRes,
  TPayload extends Record<string, any> | undefined,
  TQuery extends Record<string, any> | undefined = undefined,
>(
  path: string,
  payload?: TPayload,
  query?: TQuery,
  options?: Omit<RequestInit, "body">
): Promise<TRes> {
  const url = getUrl(path, query)
  const requestOptions = await getOptions(options, payload)

  let response = await fetch(url, requestOptions)

  // If the token is expired or unauthorized, refresh the token and retry once
  if (response.status === 401) {
    requestOptions.headers = await commonHeaders()
    response = await fetch(url, requestOptions)
  }

  if (!response.ok) {
    const errorData = await response.json()

    throw new Error(`API error ${response.status}: ${errorData.message}`)
  }

  const contentType = response.headers.get("content-type")

  if (!contentType?.includes("application/json")) {
    return response as TRes
  }

  return response.json()
}

export async function getRequest<
  TRes,
  TQuery extends Record<string, any> | undefined = object,
>(
  path: string,
  query?: TQuery,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, undefined, Record<string, any>>(
    path,
    undefined,
    query,
    {
      ...options,
      method: "GET",
    }
  )
}

export async function postRequest<
  TRes,
  TPayload extends Record<string, any> | undefined = object,
>(
  path: string,
  payload?: TPayload,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, Record<string, any>>(path, payload, undefined, {
    ...options,
    method: "POST",
  })
}

export async function putRequest<
  TRes,
  TQuery extends Record<string, any> | undefined = object,
>(
  path: string,
  query?: TQuery,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, undefined, Record<string, any>>(
    path,
    undefined,
    query,
    {
      ...options,
      method: "PUT",
    }
  )
}

export async function deleteRequest<
  TRes,
  TQuery extends Record<string, any> | undefined = object,
>(
  path: string,
  query?: TQuery,
  options?: Omit<RequestInit, "body" | "method">
): Promise<TRes> {
  return makeRequest<TRes, undefined, Record<string, any>>(
    path,
    undefined,
    query,
    {
      ...options,
      method: "DELETE",
    }
  )
}
