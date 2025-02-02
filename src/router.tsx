import { createBrowserRouter, Navigate } from "react-router-dom"
import Layout from "./Layout"
import Chat from "./Chat"
import Character from "./Character"
import { useGetAgentsQuery } from "@/api"

const RedirectToFirstAgent = () => {
  const { data: agents, isLoading } = useGetAgentsQuery()

  if (isLoading) return <div>Loading...</div>
  if (agents && agents.length > 0) {
    return <Navigate to={`/${agents[0].id}/chat`} replace />
  }
  return <div>No agents found</div>
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToFirstAgent />,
  },
  {
    path: "/:agentId",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="chat" replace />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "character",
        element: <Character />,
      },
    ],
  },
])
